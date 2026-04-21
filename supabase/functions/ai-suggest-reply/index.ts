// Lovable AI Gateway – generates email reply suggestions or full drafts
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface Body {
  mode: 'suggestions' | 'draft';
  context: {
    incomingSubject?: string;
    incomingBody?: string;
    senderName?: string;
    senderEmail?: string;
    /** Existing draft the user already typed; AI should refine, not replace */
    currentDraft?: string;
    /** Custom hint, e.g. "freundlich, Termin vorschlagen" */
    instruction?: string;
    /** "follow_up" when sending a fresh outbound mail (no incoming) */
    type?: 'reply' | 'follow_up';
  };
}

const SYSTEM_PROMPT = `Du bist Jan Sommershoff, Unternehmer im Bereich KI-Automatisierung. Du schreibst persönliche, klare und professionelle Geschäfts-E-Mails auf Deutsch.

Stil:
- Direkt, freundlich, auf Augenhöhe
- Kein Marketing-Sprech, keine Floskeln ("Ich hoffe, diese E-Mail erreicht Sie gut")
- Du-Form (nie Sie)
- Kurze Sätze, klare Struktur
- Signiere mit "Beste Grüße\\nJan" am Ende
- Keine erfundenen Termine oder Zusagen – nutze Platzhalter wie [Termin] wenn nötig`;

function buildPrompt(body: Body): { system: string; user: string } {
  const { mode, context } = body;
  const ctx = [
    context.senderName && `Absender: ${context.senderName}`,
    context.senderEmail && `Mail: ${context.senderEmail}`,
    context.incomingSubject && `Eingegangener Betreff: ${context.incomingSubject}`,
    context.incomingBody && `Eingegangene Nachricht:\n"""\n${context.incomingBody.slice(0, 4000)}\n"""`,
    context.currentDraft && `Bisheriger Entwurf des Nutzers (verfeinere ihn):\n"""\n${context.currentDraft.slice(0, 2000)}\n"""`,
    context.instruction && `Zusatz-Vorgabe: ${context.instruction}`,
    context.type === 'follow_up' && !context.incomingBody && 'Es liegt KEINE eingehende Mail vor – schreibe eine neue Erstkontakt-/Follow-up-Mail.',
  ]
    .filter(Boolean)
    .join('\n');

  if (mode === 'suggestions') {
    return {
      system: SYSTEM_PROMPT,
      user: `Erstelle GENAU 3 unterschiedliche Antwortvarianten zu folgender Situation:

${ctx}

Varianten-Stil:
1. Freundlich & ausführlich
2. Kurz & direkt
3. Professionell mit Termin-Vorschlag

Jede Variante soll eine vollständige, sendefertige Mail sein (max. 8 Sätze).`,
    };
  }

  return {
    system: SYSTEM_PROMPT,
    user: `Erstelle EINEN vollständigen, sendefertigen Mail-Entwurf zu folgender Situation:

${ctx}

Der Entwurf soll direkt versendbar sein (max. 12 Sätze).`,
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as Body;
    if (!body?.mode || !body?.context) {
      return new Response(JSON.stringify({ error: 'Invalid body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');

    const { system, user } = buildPrompt(body);

    const tools = body.mode === 'suggestions'
      ? [{
          type: 'function',
          function: {
            name: 'return_suggestions',
            description: 'Return three reply variants',
            parameters: {
              type: 'object',
              properties: {
                suggestions: {
                  type: 'array',
                  minItems: 3,
                  maxItems: 3,
                  items: {
                    type: 'object',
                    properties: {
                      label: { type: 'string', description: 'Kurzer Stil-Name (z.B. "Freundlich", "Direkt", "Mit Termin")' },
                      subject: { type: 'string', description: 'Betreffzeile, ggf. mit Re:' },
                      body: { type: 'string', description: 'Vollständiger Mailtext' },
                    },
                    required: ['label', 'subject', 'body'],
                    additionalProperties: false,
                  },
                },
              },
              required: ['suggestions'],
              additionalProperties: false,
            },
          },
        }]
      : [{
          type: 'function',
          function: {
            name: 'return_draft',
            description: 'Return a single mail draft',
            parameters: {
              type: 'object',
              properties: {
                subject: { type: 'string' },
                body: { type: 'string' },
              },
              required: ['subject', 'body'],
              additionalProperties: false,
            },
          },
        }];

    const toolName = body.mode === 'suggestions' ? 'return_suggestions' : 'return_draft';

    const aiRes = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-pro',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
        tools,
        tool_choice: { type: 'function', function: { name: toolName } },
      }),
    });

    if (!aiRes.ok) {
      const text = await aiRes.text();
      console.error('AI gateway error', aiRes.status, text);
      if (aiRes.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate Limit überschritten – bitte gleich erneut versuchen.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (aiRes.status === 402) {
        return new Response(JSON.stringify({ error: 'Lovable AI Guthaben erschöpft. Bitte unter Settings → Workspace → Usage aufladen.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ error: 'AI Gateway Fehler' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await aiRes.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      console.error('No tool call returned', JSON.stringify(data).slice(0, 500));
      return new Response(JSON.stringify({ error: 'Keine KI-Antwort erhalten' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const parsed = JSON.parse(toolCall.function.arguments);
    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('ai-suggest-reply error:', e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
