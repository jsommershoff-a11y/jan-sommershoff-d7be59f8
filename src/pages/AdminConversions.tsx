import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Copy, Check, Target, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { GA4_MEASUREMENT_ID, META_PIXEL_ID } from '@/lib/tracking';
import { SEOHead } from '@/components/seo/SEOHead';

type Conversion = {
  trigger: string;
  url: string;
  ga4Event: string;
  metaEvent: string;
  params: string;
  goalType: 'Lead' | 'Contact' | 'Pageview' | 'Engagement';
  notes?: string;
};

const CONVERSIONS: Conversion[] = [
  {
    trigger: 'Submit Kontaktformular (Potenzialanalyse)',
    url: '/kontakt?ziel=potenzialanalyse',
    ga4Event: 'lead_submit_potenzialanalyse',
    metaEvent: '— (siehe /danke/kontakt)',
    params: '{ ziel: "potenzialanalyse" }',
    goalType: 'Lead',
    notes: 'GA4-Event beim Submit, kurz vor Redirect zu /danke/kontakt. Meta Lead feuert dort via Router-Tracker.',
  },
  {
    trigger: 'Submit Kontaktformular (Notfallkoffer)',
    url: '/kontakt?ziel=notfallkoffer',
    ga4Event: 'lead_submit_notfallkoffer',
    metaEvent: '— (siehe /danke/lead)',
    params: '{ ziel: "notfallkoffer" }',
    goalType: 'Lead',
    notes: 'Lead-Magnet-Anfrage. Meta CompleteRegistration feuert auf /danke/lead.',
  },
  {
    trigger: '★ Pageview Danke-Seite Kontakt (Hauptconversion)',
    url: '/danke/kontakt',
    ga4Event: 'page_view',
    metaEvent: 'Lead',
    params: '{ content_name: "Potenzialanalyse Anfrage", content_category: "High Intent Consulting Lead", value: 1, currency: "EUR" }',
    goalType: 'Lead',
    notes: 'Primäres Meta-Conversion-Event. Wird einmal pro Session über MetaPixelRouterTracker gefeuert (sessionStorage-Dedup).',
  },
  {
    trigger: '★ Pageview Danke-Seite Lead (Hauptconversion)',
    url: '/danke/lead',
    ga4Event: 'page_view',
    metaEvent: 'CompleteRegistration',
    params: '{ content_name: "KI Notfallkoffer", value: 0, currency: "EUR", status: true }',
    goalType: 'Lead',
    notes: 'Wird nach erfolgreicher Lead-Magnet-Anfrage erreicht. Einmal pro Session via MetaPixelRouterTracker.',
  },
  {
    trigger: 'Login erfolgreich (Notfallkoffer)',
    url: '/auth (Login-Tab)',
    ga4Event: 'login_success',
    metaEvent: '—',
    params: '{ funnel: "notfallkoffer" }',
    goalType: 'Lead',
    notes: 'Wird nach Login gefeuert, bevor Redirect zu /danke/lead.',
  },
  {
    trigger: 'View Kontaktseite',
    url: '/kontakt?ziel=…',
    ga4Event: 'kontakt_view',
    metaEvent: '—',
    params: '{ ziel }',
    goalType: 'Pageview',
    notes: 'Soft-Conversion zur Funnel-Analyse (Drop-off zwischen View und Submit).',
  },
  {
    trigger: 'Sticky-CTA eingeblendet',
    url: 'global (scroll > 30vh)',
    ga4Event: 'cta_shown',
    metaEvent: '—',
    params: '{ cta_id: "sticky_notfallkoffer", placement: "sticky_bottom" }',
    goalType: 'Engagement',
    notes: 'Impression-Tracking für die Sticky Bottom-Bar.',
  },
  {
    trigger: 'Sticky-CTA Klick',
    url: '→ /kontakt?ziel=notfallkoffer',
    ga4Event: 'cta_click',
    metaEvent: '—',
    params: '{ cta_id: "sticky_notfallkoffer", placement: "sticky_bottom", target: "notfallkoffer" }',
    goalType: 'Engagement',
  },
  {
    trigger: 'Floating-CTA geöffnet',
    url: 'global (FAB)',
    ga4Event: 'cta_shown',
    metaEvent: '—',
    params: '{ cta_id: "floating_multi_channel", placement: "floating_fab" }',
    goalType: 'Engagement',
  },
  {
    trigger: 'Floating-CTA Channel-Klick',
    url: 'WhatsApp / Phone / Email / Potenzialanalyse',
    ga4Event: 'cta_click',
    metaEvent: '—',
    params: '{ cta_id: "floating_multi_channel", channel: "whatsapp|phone|email|potenzialanalyse" }',
    goalType: 'Engagement',
    notes: 'Zusätzlich wird channel-spezifisches Event gefeuert (whatsapp_click, phone_click, …).',
  },
  {
    trigger: 'Exit-Intent Popup eingeblendet',
    url: 'global (30s Inaktivität)',
    ga4Event: 'popup_shown',
    metaEvent: '—',
    params: '{ popup_id: "exit_intent_notfallkoffer" }',
    goalType: 'Engagement',
  },
  {
    trigger: 'Exit-Intent Popup geschlossen',
    url: 'X-Button',
    ga4Event: 'popup_dismissed',
    metaEvent: '—',
    params: '{ popup_id: "exit_intent_notfallkoffer", dismiss_reason: "close_button" }',
    goalType: 'Engagement',
  },
  {
    trigger: 'Exit-Intent Popup CTA-Klick',
    url: '→ /kontakt?ziel=notfallkoffer',
    ga4Event: 'popup_cta_click',
    metaEvent: '—',
    params: '{ popup_id: "exit_intent_notfallkoffer" }',
    goalType: 'Engagement',
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success('Kopiert');
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center justify-center size-7 rounded-md border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
      aria-label="In die Zwischenablage kopieren"
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </button>
  );
}

export default function AdminConversions() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (!data.session) {
        navigate('/admin/login');
        return;
      }
      setAuthChecked(true);
    })();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        Lade…
      </div>
    );
  }

  const ga4Configured = !GA4_MEASUREMENT_ID.includes('XXXX');
  const metaConfigured = !META_PIXEL_ID.includes('XXXX');

  return (
    <>
      <SEOHead title="Conversions Übersicht – Admin" canonicalPath="/admin/conversions" noIndex />
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
              >
                <ArrowLeft className="size-4" />
                Zurück zum Admin
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <Target className="size-7 text-primary" />
                Conversions Übersicht
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Mapping aller Tracking-Events: GA4 Key-Events &amp; Meta Pixel Standard-Events.
              </p>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  GA4 Measurement ID
                </span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    ga4Configured
                      ? 'bg-primary/15 text-primary'
                      : 'bg-destructive/15 text-destructive'
                  }`}
                >
                  {ga4Configured ? 'Konfiguriert' : 'Platzhalter'}
                </span>
              </div>
              <code className="block mt-2 text-sm font-mono text-foreground break-all">
                {GA4_MEASUREMENT_ID}
              </code>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Meta Pixel ID
                </span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    metaConfigured
                      ? 'bg-primary/15 text-primary'
                      : 'bg-destructive/15 text-destructive'
                  }`}
                >
                  {metaConfigured ? 'Konfiguriert' : 'Platzhalter'}
                </span>
              </div>
              <code className="block mt-2 text-sm font-mono text-foreground break-all">
                {META_PIXEL_ID}
              </code>
            </div>
          </div>

          {/* Conversions Table */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="text-left p-3 font-semibold">Trigger / Auslöser</th>
                    <th className="text-left p-3 font-semibold">URL</th>
                    <th className="text-left p-3 font-semibold">GA4 Event</th>
                    <th className="text-left p-3 font-semibold">Meta Event</th>
                    <th className="text-left p-3 font-semibold">Parameter</th>
                    <th className="text-left p-3 font-semibold">Ziel-Typ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {CONVERSIONS.map((c, i) => (
                    <tr key={i} className="align-top hover:bg-muted/20 transition-colors">
                      <td className="p-3">
                        <p className="font-medium text-foreground">{c.trigger}</p>
                        {c.notes && (
                          <p className="text-xs text-muted-foreground mt-1 leading-snug">
                            {c.notes}
                          </p>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <code className="text-xs font-mono bg-muted/50 px-1.5 py-0.5 rounded">
                            {c.url}
                          </code>
                          <CopyButton text={c.url} />
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <code className="text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded whitespace-nowrap">
                            {c.ga4Event}
                          </code>
                          {c.ga4Event !== 'page_view' && <CopyButton text={c.ga4Event} />}
                        </div>
                      </td>
                      <td className="p-3">
                        <code className="text-xs font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded whitespace-nowrap">
                          {c.metaEvent}
                        </code>
                      </td>
                      <td className="p-3">
                        <code className="text-xs font-mono text-muted-foreground break-all">
                          {c.params}
                        </code>
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
                            c.goalType === 'Lead'
                              ? 'bg-accent/15 text-accent'
                              : c.goalType === 'Contact'
                                ? 'bg-primary/15 text-primary'
                                : c.goalType === 'Engagement'
                                  ? 'bg-primary/10 text-primary/80'
                                  : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {c.goalType}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Setup Hints */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-base font-semibold text-foreground mb-3">
                GA4 Goal-Setup
              </h2>
              <ol className="list-decimal pl-5 space-y-1.5 text-sm text-muted-foreground">
                <li>GA4 → Admin → Events → „Vorhandenes Event als Conversion markieren".</li>
                <li>
                  Markiere folgende Events als <strong>Key Events</strong>:{' '}
                  <code className="text-xs bg-muted/50 px-1 py-0.5 rounded">lead_submit_potenzialanalyse</code>,{' '}
                  <code className="text-xs bg-muted/50 px-1 py-0.5 rounded">lead_submit_notfallkoffer</code>,{' '}
                  <code className="text-xs bg-muted/50 px-1 py-0.5 rounded">login_success</code>.
                </li>
                <li>
                  Optional: Pageview-basiertes Custom Event auf{' '}
                  <code className="text-xs bg-muted/50 px-1 py-0.5 rounded">page_path</code>{' '}
                  enthält <code className="text-xs bg-muted/50 px-1 py-0.5 rounded">/danke/</code>.
                </li>
                <li>Custom Dimension für Parameter <code className="text-xs">ziel</code> registrieren (Funnel-Quelle).</li>
              </ol>
              <a
                href="https://analytics.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-3"
              >
                GA4 öffnen <ExternalLink className="size-3.5" />
              </a>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-base font-semibold text-foreground mb-3">
                Meta Events Manager
              </h2>
              <ol className="list-decimal pl-5 space-y-1.5 text-sm text-muted-foreground">
                <li>
                  Events Manager → Datenquellen → Pixel öffnen → Standard-Events prüfen:{' '}
                  <code className="text-xs bg-muted/50 px-1 py-0.5 rounded">PageView</code>,{' '}
                  <code className="text-xs bg-muted/50 px-1 py-0.5 rounded">Lead</code>,{' '}
                  <code className="text-xs bg-muted/50 px-1 py-0.5 rounded">CompleteRegistration</code>.
                </li>
                <li>
                  <strong>Lead</strong> feuert auf{' '}
                  <code className="text-xs bg-muted/50 px-1 py-0.5 rounded">/danke/kontakt</code> (Potenzialanalyse, value 1 EUR).
                </li>
                <li>
                  <strong>CompleteRegistration</strong> feuert auf{' '}
                  <code className="text-xs bg-muted/50 px-1 py-0.5 rounded">/danke/lead</code> (Notfallkoffer Lead-Magnet).
                </li>
                <li>
                  Beide Events sind via <code className="text-xs">sessionStorage</code> dedupliziert (1× pro Session).
                </li>
                <li>Aggregated Event Measurement: <strong>Lead</strong> Slot 1, <strong>CompleteRegistration</strong> Slot 2.</li>
              </ol>
              <a
                href="https://business.facebook.com/events_manager"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-3"
              >
                Events Manager öffnen <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
