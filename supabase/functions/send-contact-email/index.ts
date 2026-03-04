const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, name, email, message } = await req.json();

    if (!type || !name || !email) {
      return new Response(
        JSON.stringify({ error: 'type, name, and email are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Save to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({ type, name, email, message: message || null });

    if (dbError) {
      console.error('DB error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save submission' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send email via Resend
    const resendApiKey = Deno.env.get('Resend');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      // Still return success since DB save worked
      return new Response(
        JSON.stringify({ success: true, emailSent: false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const isLeadMagnet = type === 'lead_magnet';
    const subject = isLeadMagnet
      ? `🎯 Neue Lead-Magnet Anfrage: ${name}`
      : `📩 Neue Kontaktanfrage: ${name}`;

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">${isLeadMagnet ? 'Neue KI-Notfallkoffer Anfrage' : 'Neue Kontaktanfrage'}</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">E-Mail:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          ${message ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555; vertical-align: top;">Nachricht:</td>
            <td style="padding: 8px 0;">${message.replace(/\n/g, '<br>')}</td>
          </tr>` : ''}
        </table>
        <hr style="margin-top: 24px; border: none; border-top: 1px solid #eee;" />
        <p style="color: #999; font-size: 12px;">Gesendet über jansommershoff.de</p>
      </div>
    `;

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Website <onboarding@resend.dev>',
        to: ['j.s@krsimmobilien.de'],
        subject,
        html: htmlBody,
        reply_to: email,
      }),
    });

    const emailData = await emailRes.json();
    if (!emailRes.ok) {
      console.error('Resend error:', emailData);
    }

    return new Response(
      JSON.stringify({ success: true, emailSent: emailRes.ok }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
