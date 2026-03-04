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

    return new Response(
      JSON.stringify({ success: true, emailSent: emailRes.ok }),
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
