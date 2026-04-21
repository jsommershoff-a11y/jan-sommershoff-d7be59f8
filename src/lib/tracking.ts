/**
 * Lightweight conversion tracking helper.
 * Pushes events to:
 *   - window.dataLayer (GTM-ready)
 *   - window.gtag (GA4 direct, if available)
 *
 * Add Google Tag Manager or gtag.js in index.html when ready —
 * this helper degrades gracefully when neither is present.
 */
type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: string, params: TrackParams = {}) {
  try {
    // GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });

    // GA4 direct
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, params);
    }

    // Dev-friendly log (silent in prod builds via tree-shake-friendly check)
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug('[track]', event, params);
    }
  } catch {
    /* never block UI on tracking failure */
  }
}

export function trackPageView(path: string, title?: string) {
  trackEvent('page_view', { page_path: path, page_title: title });
}
