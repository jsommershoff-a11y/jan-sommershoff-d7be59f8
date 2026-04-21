import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/microsoft_outlook';

interface ListBody {
  action: 'list';
  top?: number;
  skip?: number;
  search?: string;
  unreadOnly?: boolean;
}
interface GetBody {
  action: 'get';
  messageId: string;
}
interface SendBody {
  action: 'send';
  to: string;
  subject: string;
  body: string;
  isHtml?: boolean;
  cc?: string[];
  bcc?: string[];
}
interface ReplyBody {
  action: 'reply';
  messageId: string;
  comment: string;
}
interface MarkReadBody {
  action: 'markRead';
  messageId: string;
  isRead?: boolean;
}
interface UnreadCountBody {
  action: 'unreadCount';
}
type RequestBody = ListBody | GetBody | SendBody | ReplyBody | MarkReadBody | UnreadCountBody;

async function gatewayFetch(
  path: string,
  init: RequestInit,
  lovableKey: string,
  outlookKey: string,
) {
  const res = await fetch(`${GATEWAY_URL}${path}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${lovableKey}`,
      'X-Connection-Api-Key': outlookKey,
    },
  });
  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    throw new Error(
      `Outlook API failed [${res.status}]: ${typeof data === 'string' ? data : JSON.stringify(data)}`,
    );
  }
  return data;
}

async function logInteraction(
  client: ReturnType<typeof createClient>,
  userId: string,
  args: { recipientEmail: string; subject: string; content: string; direction: 'outbound' | 'inbound' },
) {
  try {
    // Find matching contact for this user (case-insensitive email match)
    const { data: contact } = await client
      .from('contacts')
      .select('id')
      .eq('user_id', userId)
      .ilike('email', args.recipientEmail)
      .maybeSingle();

    await client.from('interactions').insert({
      user_id: userId,
      contact_id: contact?.id ?? null,
      type: 'email',
      channel: 'outlook',
      direction: args.direction,
      subject: args.subject,
      content: args.content,
      status: 'sent',
      occurred_at: new Date().toISOString(),
    });
  } catch (e) {
    console.warn('logInteraction failed:', e);
  }
}

interface OutlookListMessage {
  id: string;
  subject?: string;
  bodyPreview?: string;
  receivedDateTime?: string;
  from?: { emailAddress?: { name?: string; address?: string } };
}

async function logInboundMessages(
  serviceClient: ReturnType<typeof createClient>,
  userId: string,
  messages: OutlookListMessage[],
) {
  if (!messages.length) return;

  const addresses = Array.from(
    new Set(
      messages
        .map((m) => m.from?.emailAddress?.address?.toLowerCase().trim())
        .filter((a): a is string => !!a),
    ),
  );
  if (!addresses.length) return;

  const { data: contactRows } = await serviceClient
    .from('contacts')
    .select('id, email')
    .eq('user_id', userId)
    .in('email', addresses);

  const matched = new Map<string, number>();
  (contactRows || []).forEach((c: { id: number; email: string | null }) => {
    if (c.email) matched.set(c.email.toLowerCase(), c.id);
  });

  // Fallback for case-mismatched stored emails
  const unmatched = addresses.filter((a) => !matched.has(a));
  for (const addr of unmatched) {
    const { data: row } = await serviceClient
      .from('contacts')
      .select('id, email')
      .eq('user_id', userId)
      .ilike('email', addr)
      .maybeSingle();
    if (row?.id) matched.set(addr, row.id);
  }

  if (matched.size === 0) return;

  const candidates = messages
    .map((m) => {
      const addr = m.from?.emailAddress?.address?.toLowerCase().trim();
      if (!addr) return null;
      const contactId = matched.get(addr);
      if (!contactId) return null;
      const occurredAt = m.receivedDateTime
        ? new Date(m.receivedDateTime).toISOString()
        : new Date().toISOString();
      return {
        user_id: userId,
        contact_id: contactId,
        type: 'email',
        channel: 'outlook',
        direction: 'inbound',
        subject: m.subject || '(kein Betreff)',
        content: m.bodyPreview || null,
        status: 'received',
        occurred_at: occurredAt,
      };
    })
    .filter((r): r is NonNullable<typeof r> => !!r);

  if (!candidates.length) return;

  // Idempotency by (contact_id, occurred_at) — Graph timestamps uniquely identify
  const occurredTimes = candidates.map((c) => c.occurred_at);
  const contactIds = Array.from(new Set(candidates.map((c) => c.contact_id)));
  const { data: existing } = await serviceClient
    .from('interactions')
    .select('contact_id, occurred_at')
    .eq('user_id', userId)
    .eq('type', 'email')
    .eq('direction', 'inbound')
    .in('contact_id', contactIds)
    .in('occurred_at', occurredTimes);

  const existingKeys = new Set(
    (existing || []).map(
      (e: { contact_id: number | null; occurred_at: string }) =>
        `${e.contact_id}|${new Date(e.occurred_at).toISOString()}`,
    ),
  );

  const toInsert = candidates.filter(
    (c) => !existingKeys.has(`${c.contact_id}|${c.occurred_at}`),
  );

  if (!toInsert.length) return;

  const { error } = await serviceClient.from('interactions').insert(toInsert);
  if (error) {
    console.warn('logInboundMessages insert failed:', error.message);
  } else {
    console.log(`Logged ${toInsert.length} inbound mail(s) as interactions`);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // --- Auth: only admins ---
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
    } = await userClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const { data: roleRow } = await userClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();
    if (!roleRow) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // --- Connector keys ---
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const OUTLOOK_API_KEY = Deno.env.get('MICROSOFT_OUTLOOK_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');
    if (!OUTLOOK_API_KEY) throw new Error('MICROSOFT_OUTLOOK_API_KEY is not configured');

    const body = (await req.json()) as RequestBody;

    if (body.action === 'list') {
      const top = Math.min(Math.max(body.top ?? 25, 1), 100);
      const skip = Math.max(body.skip ?? 0, 0);
      const params = new URLSearchParams({
        $top: String(top),
        $skip: String(skip),
        $orderby: 'receivedDateTime desc',
        $count: 'true',
        $select:
          'id,subject,from,toRecipients,receivedDateTime,bodyPreview,isRead,hasAttachments',
      });
      if (body.unreadOnly) {
        params.set('$filter', 'isRead eq false');
      }
      if (body.search && body.search.trim()) {
        params.set('$search', `"${body.search.replace(/"/g, '\\"')}"`);
        params.delete('$orderby'); // $search & $orderby not allowed together
        params.delete('$filter'); // $search & $filter not allowed together
      }
      const data = await gatewayFetch(
        `/me/messages?${params.toString()}`,
        { method: 'GET' },
        LOVABLE_API_KEY,
        OUTLOOK_API_KEY,
      );

      // Auto-log inbound messages from known contacts (best-effort, non-blocking)
      try {
        const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        if (serviceKey) {
          const serviceClient = createClient(supabaseUrl, serviceKey);
          const messages = (data as { value?: OutlookListMessage[] })?.value || [];
          await logInboundMessages(serviceClient, user.id, messages);
        }
      } catch (e) {
        console.warn('Inbound logging error:', e);
      }

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (body.action === 'get') {
      if (!body.messageId) throw new Error('messageId required');
      const data = await gatewayFetch(
        `/me/messages/${encodeURIComponent(body.messageId)}`,
        { method: 'GET' },
        LOVABLE_API_KEY,
        OUTLOOK_API_KEY,
      );
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (body.action === 'markRead') {
      if (!body.messageId) throw new Error('messageId required');
      await gatewayFetch(
        `/me/messages/${encodeURIComponent(body.messageId)}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isRead: body.isRead ?? true }),
        },
        LOVABLE_API_KEY,
        OUTLOOK_API_KEY,
      );
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (body.action === 'send') {
      if (!body.to || !body.subject || !body.body) {
        throw new Error('to, subject, body required');
      }
      const message = {
        subject: body.subject,
        body: {
          contentType: body.isHtml ? 'HTML' : 'Text',
          content: body.body,
        },
        toRecipients: [{ emailAddress: { address: body.to } }],
        ...(body.cc?.length
          ? { ccRecipients: body.cc.map((a) => ({ emailAddress: { address: a } })) }
          : {}),
        ...(body.bcc?.length
          ? { bccRecipients: body.bcc.map((a) => ({ emailAddress: { address: a } })) }
          : {}),
      };
      await gatewayFetch(
        `/me/sendMail`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, saveToSentItems: true }),
        },
        LOVABLE_API_KEY,
        OUTLOOK_API_KEY,
      );

      // Log as interaction
      await logInteraction(userClient, user.id, {
        recipientEmail: body.to,
        subject: body.subject,
        content: body.body,
        direction: 'outbound',
      });

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (body.action === 'reply') {
      if (!body.messageId || !body.comment) {
        throw new Error('messageId, comment required');
      }
      await gatewayFetch(
        `/me/messages/${encodeURIComponent(body.messageId)}/reply`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ comment: body.comment }),
        },
        LOVABLE_API_KEY,
        OUTLOOK_API_KEY,
      );

      // Lookup original message to get recipient (the original sender we reply to)
      try {
        const orig = await gatewayFetch(
          `/me/messages/${encodeURIComponent(body.messageId)}?$select=subject,from`,
          { method: 'GET' },
          LOVABLE_API_KEY,
          OUTLOOK_API_KEY,
        ) as { subject?: string; from?: { emailAddress?: { address?: string } } };
        const replyTo = orig?.from?.emailAddress?.address;
        if (replyTo) {
          await logInteraction(userClient, user.id, {
            recipientEmail: replyTo,
            subject: orig.subject ? `Re: ${orig.subject}` : 'Antwort',
            content: body.comment,
            direction: 'outbound',
          });
        }
      } catch (e) {
        console.warn('Reply interaction logging failed:', e);
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('outlook-mail error:', message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
