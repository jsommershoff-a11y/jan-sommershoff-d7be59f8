import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';
import { trackEvent, trackPageView } from '@/lib/tracking';

interface ThankYouProps {
  title: string;
  subtitle: string;
  eventName: string;
  /** Nur dokumentarisch — Meta-Conversion-Events werden zentral
   * vom MetaPixelRouterTracker auf /danke/kontakt bzw. /danke/lead gefeuert. */
  metaEvent?: 'Lead' | 'Contact' | 'Schedule' | 'Purchase' | 'CompleteRegistration' | 'ViewContent';
  value?: number;
  currency?: string;
  primaryHref?: string;
  primaryLabel?: string;
  /** Optionales Google-Ads/GA4-Lead-Form-Conversion-Event, das einmalig
   *  nach einem erfolgreichen Submit gefeuert wird (z.B.
   *  'conversion_event_submit_lead_form_2'). Wird nur ausgelöst, wenn
   *  vom Formular `conversion_params` in sessionStorage hinterlegt wurden,
   *  damit Direktaufrufe der Danke-Seite kein Conversion-Event triggern. */
  leadFormConversionEvent?: string;
}

export function ThankYou({
  title,
  subtitle,
  eventName,
  value,
  currency,
  primaryHref = '/',
  primaryLabel = 'Zur Startseite',
}: ThankYouProps) {
  useEffect(() => {
    // Vom Submit übergebene Form-Parameter (event_category, event_label,
    // lead_type, form_id, …) aus sessionStorage einlesen und einmalig nutzen.
    let formParams: Record<string, unknown> = {};
    try {
      const raw = sessionStorage.getItem('conversion_params');
      if (raw) {
        formParams = JSON.parse(raw) ?? {};
        sessionStorage.removeItem('conversion_params');
      }
    } catch { /* ignore */ }

    const pagePath = typeof window !== 'undefined' ? window.location.pathname : '';
    const params = {
      ...formParams,
      ...(value !== undefined ? { value } : {}),
      ...(currency ? { currency } : {}),
    };

    // -----------------------------------------------------------
    // Validierungs-Tracking auf Danke-Seiten
    // -----------------------------------------------------------
    // 1) GA4 page_view (über GTM/dataLayer) – Standardsignal,
    //    damit die Danke-Seite als Ziel in GA4-Reports erscheint.
    trackPageView(pagePath, document.title);

    // Dedup-Key, damit Reload kein Doppel-Tracking auslöst.
    const ackKey = `conversion_ack:${pagePath}`;
    let alreadyAcked = false;
    try {
      alreadyAcked = sessionStorage.getItem(ackKey) === '1';
    } catch { /* ignore */ }

    if (!alreadyAcked) {
      // 2) Spezifisches GA4/dataLayer-Event je Danke-Seite (z.B. contact_submit).
      trackEvent(eventName, params);

      // 3) Dediziertes Validierungs-Event – in GA4/GTM leicht filterbar
      //    und unabhängig vom eigentlichen Conversion-Event messbar.
      trackEvent('conversion_ack', {
        ...params,
        ack_event: eventName,
        page_path: pagePath,
      });

      try { sessionStorage.setItem(ackKey, '1'); } catch { /* ignore */ }

      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.debug('[conversion_ack]', {
          page: pagePath,
          source_event: eventName,
          params,
        });
      }
    }

    // 4) Generisches Conversion-Page-View-Event für Google Ads / GA4.
    try {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'conversion_event_page_view', {
          event_category: 'conversion',
          event_label: eventName,
          ...params,
          page_path: pagePath,
          source_event: eventName,
        });
      }
    } catch {
      /* never block UI */
    }
  }, [eventName, value, currency]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center bg-card border border-border rounded-2xl p-8 md:p-12 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="size-9 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
          {title}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={primaryHref}
            className="inline-flex items-center justify-center gap-2 px-6 h-12 bg-accent text-white font-semibold rounded-md hover:opacity-90 transition"
          >
            {primaryLabel}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 h-12 border border-border text-foreground font-medium rounded-md hover:bg-muted transition"
          >
            <Home className="size-4" />
            Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}
