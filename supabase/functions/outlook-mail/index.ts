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
type RequestBody = ListBody | GetBody | SendBody | ReplyBody;

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
        $select:
          'id,subject,from,toRecipients,receivedDateTime,bodyPreview,isRead,hasAttachments',
      });
      if (body.search && body.search.trim()) {
        params.set('$search', `"${body.search.replace(/"/g, '\\"')}"`);
        params.delete('$orderby'); // $search & $orderby not allowed together
      }
      const data = await gatewayFetch(
        `/me/messages?${params.toString()}`,
        { method: 'GET' },
        LOVABLE_API_KEY,
        OUTLOOK_API_KEY,
      );
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
