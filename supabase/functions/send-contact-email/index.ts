const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, name, email, message } = await req.json();

    // Validate required fields
    if (!type || !name || !email) {
      return new Response(
        JSON.stringify({ error: 'type, name, and email are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate type
    if (!['contact', 'lead_magnet'].includes(type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid submission type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate input lengths
    if (name.length > 100 || email.length > 255 || (message && message.length > 5000)) {
      return new Response(
        JSON.stringify({ error: 'Input exceeds maximum allowed length' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Email-based rate limiting: max 3 submissions per hour
    const { data: recentSubmissions } = await supabase
      .from('contact_submissions')
      .select('created_at')
      .eq('email', email)
      .gte('created_at', new Date(Date.now() - 3600000).toISOString());

    if (recentSubmissions && recentSubmissions.length >= 3) {
      return new Response(
        JSON.stringify({ error: 'Zu viele Anfragen. Bitte versuche es später erneut.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Save to database
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({ type, name, email, message: message || null });

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Unable to save your submission. Please try again later.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send email via Resend
    const resendApiKey = Deno.env.get('Resend');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: true, emailSent: false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const isLeadMagnet = type === 'lead_magnet';
    const subject = isLeadMagnet
      ? `🎯 Neue Lead-Magnet Anfrage: ${escapeHtml(name)}`
      : `📩 Neue Kontaktanfrage: ${escapeHtml(name)}`;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = message ? escapeHtml(message).replace(/\n/g, '<br>') : '';

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">${isLeadMagnet ? 'Neue KI-Notfallkoffer Anfrage' : 'Neue Kontaktanfrage'}</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td>
            <td style="padding: 8px 0;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">E-Mail:</td>
            <td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
          </tr>
          ${safeMessage ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555; vertical-align: top;">Nachricht:</td>
            <td style="padding: 8px 0;">${safeMessage}</td>
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
        from: 'Jan Sommershoff <info@jan-sommershoff.de>',
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

    // Auto-confirmation for regular contact submissions
    let confirmationSent = false;
    if (!isLeadMagnet) {
      const confirmationHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
          <div style="text-align: center; padding: 32px 0; border-bottom: 3px solid #0F3D2E;">
            <h1 style="color: #0F3D2E; font-size: 26px; margin: 0; font-weight: 700;">Vielen Dank für deine Nachricht!</h1>
          </div>
          <div style="padding: 32px 0;">
            <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px;">Hi ${safeName},</p>
            <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px;">
              deine Anfrage ist bei mir eingegangen. Ich melde mich in der Regel innerhalb von <strong>24 Stunden</strong> persönlich bei dir.
            </p>
            ${safeMessage ? `
            <div style="background-color: #f3f4f3; border-left: 4px solid #0F3D2E; padding: 16px 20px; margin: 24px 0; border-radius: 4px;">
              <p style="font-size: 13px; color: #666; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.5px;">Deine Nachricht</p>
              <p style="font-size: 15px; color: #333; line-height: 1.6; margin: 0;">${safeMessage}</p>
            </div>` : ''}
            <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 24px 0 0;">
              Falls es dringend ist, erreichst du mich auch direkt per Antwort auf diese E-Mail.
            </p>
            <p style="font-size: 16px; color: #333; margin: 32px 0 0;">
              Beste Grüße<br><strong>Jan Sommershoff</strong>
            </p>
          </div>
          <div style="text-align: center; padding-top: 24px; border-top: 1px solid #eee; margin-top: 24px;">
            <p style="color: #999; font-size: 12px; margin: 0;">jan-sommershoff.de · Automatisierung · Struktur · KI</p>
          </div>
        </div>
      `;

      const confirmRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Jan Sommershoff <info@jan-sommershoff.de>',
          to: [email],
          subject: 'Deine Nachricht ist angekommen ✓',
          html: confirmationHtml,
          reply_to: 'j.s@krsimmobilien.de',
        }),
      });
      const confirmData = await confirmRes.json();
      confirmationSent = confirmRes.ok;
      if (!confirmRes.ok) {
        console.error('Contact confirmation email error:', confirmData);
      }
    }

    // For lead magnet: send confirmation email to the lead with download link
    let leadEmailSent = false;
    if (isLeadMagnet) {
      // TODO: Replace this placeholder URL with the actual download link to your KI-Notfallkoffer
      const downloadUrl = 'https://jan-sommershoff.de/ki-notfallkoffer-download';

      const leadHtmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
          <div style="text-align: center; padding: 32px 0; border-bottom: 3px solid #0F3D2E;">
            <h1 style="color: #0F3D2E; font-size: 28px; margin: 0; font-weight: 700;">Dein KI-Notfallkoffer ist da! 🎯</h1>
          </div>

          <div style="padding: 32px 0;">
            <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px;">
              Hi,
            </p>
            <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px;">
              vielen Dank für dein Interesse am <strong>KI-Notfallkoffer für Unternehmer</strong>.
            </p>
            <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 24px;">
              Du erhältst hiermit Zugang zu:
            </p>

            <ul style="font-size: 16px; color: #333; line-height: 1.8; padding-left: 20px; margin: 0 0 32px;">
              <li><strong>10 KI-Prompts</strong> für Unternehmer</li>
              <li><strong>3 Automatisierungs-Workflows</strong> zum direkten Nachbauen</li>
              <li><strong>Entscheidungs-Framework</strong> für strategische Entscheidungen</li>
            </ul>

            <div style="text-align: center; margin: 40px 0;">
              <a href="${downloadUrl}"
                 style="display: inline-block; background-color: #F6711F; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 700; font-size: 16px;">
                Jetzt herunterladen →
              </a>
            </div>

            <p style="font-size: 14px; color: #666; line-height: 1.6; margin: 32px 0 0;">
              Falls der Button nicht funktioniert, kopiere diesen Link in deinen Browser:<br>
              <a href="${downloadUrl}" style="color: #0F3D2E; word-break: break-all;">${downloadUrl}</a>
            </p>
          </div>

          <div style="border-top: 1px solid #eee; padding-top: 24px; margin-top: 32px;">
            <p style="font-size: 14px; color: #666; line-height: 1.6; margin: 0 0 8px;">
              Bei Fragen kannst du jederzeit auf diese E-Mail antworten.
            </p>
            <p style="font-size: 14px; color: #333; margin: 16px 0 0;">
              Beste Grüße<br>
              <strong>Jan Sommershoff</strong>
            </p>
          </div>

          <div style="text-align: center; padding-top: 24px; border-top: 1px solid #eee; margin-top: 24px;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              jansommershoff.de · KI · Automatisierung · Zukunftssicherheit
            </p>
          </div>
        </div>
      `;

      const leadEmailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Jan Sommershoff <info@jan-sommershoff.de>',
          to: [email],
          subject: '🎯 Dein KI-Notfallkoffer ist da',
          html: leadHtmlBody,
          reply_to: 'j.s@krsimmobilien.de',
        }),
      });

      const leadEmailData = await leadEmailRes.json();
      leadEmailSent = leadEmailRes.ok;
      if (!leadEmailRes.ok) {
        console.error('Lead confirmation email error:', leadEmailData);
      }
    }

    return new Response(
      JSON.stringify({ success: true, emailSent: emailRes.ok, leadEmailSent }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing contact submission:', error);
    return new Response(
      JSON.stringify({ error: 'Unable to process your request. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
