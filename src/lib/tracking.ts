/**
 * Conversion-Tracking Helper für GA4 + Meta Pixel.
 *
 * - Lädt Scripts erst NACH Cookie-Consent (DSGVO-konform).
 * - IDs als Platzhalter — bitte unten eintragen.
 * - Verwendet window.dataLayer (GTM-ready) und window.gtag (GA4).
 * - Verwendet window.fbq (Meta Pixel).
 */

// ============================================================
// 👉 HIER DEINE IDs EINTRAGEN
// ============================================================
export const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // z.B. G-ABC123DEF4
export const META_PIXEL_ID = 'XXXXXXXXXXXXXXXX';  // 15-16-stellige Zahl
// ============================================================

type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };
    _fbq?: unknown;
    __trackingLoaded?: boolean;
  }
}

const isPlaceholder = (id: string) => id.includes('XXXX');

/**
 * Lädt GA4 + Meta Pixel Scripts. Wird genau einmal ausgeführt.
 * Aufruf nur nach Cookie-Consent (siehe initTrackingIfConsented).
 */
export function loadTrackingScripts() {
  if (typeof window === 'undefined' || window.__trackingLoaded) return;
  window.__trackingLoaded = true;

  // ---------- GA4 ----------
  if (!isPlaceholder(GA4_MEASUREMENT_ID)) {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args as unknown as Record<string, unknown>);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA4_MEASUREMENT_ID, { send_page_view: true });
  }

  // ---------- Meta Pixel ----------
  if (!isPlaceholder(META_PIXEL_ID)) {
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any) {
      if (f.fbq) return;
      let n: any, t: any, s: any;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq?.('init', META_PIXEL_ID);
    window.fbq?.('track', 'PageView');
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[tracking] scripts loaded', {
      ga4: !isPlaceholder(GA4_MEASUREMENT_ID),
      meta: !isPlaceholder(META_PIXEL_ID),
    });
  }
}

/** Ruft loadTrackingScripts() nur auf, wenn Cookie-Consent === 'accepted'. */
export function initTrackingIfConsented() {
  if (typeof window === 'undefined') return;
  try {
    if (localStorage.getItem('cookie-consent') === 'accepted') {
      loadTrackingScripts();
    }
  } catch {
    /* ignore */
  }
}

/** Generisches Event an GA4 + dataLayer. */
export function trackEvent(event: string, params: TrackParams = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, params);
    }
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug('[track]', event, params);
    }
  } catch {
    /* never block UI */
  }
}

export function trackPageView(path: string, title?: string) {
  trackEvent('page_view', { page_path: path, page_title: title });
  if (typeof window.gtag === 'function' && !isPlaceholder(GA4_MEASUREMENT_ID)) {
    window.gtag('config', GA4_MEASUREMENT_ID, { page_path: path, page_title: title });
  }
}

/**
 * Triggert eine Conversion auf GA4 + Meta Pixel gleichzeitig.
 * @param eventName  z.B. 'lead', 'contact', 'schedule', 'purchase'
 * @param metaEvent  Meta-Standard-Event ('Lead' | 'Contact' | 'Schedule' | 'Purchase' | 'CompleteRegistration')
 * @param params     optionale Parameter (z.B. { value: 499, currency: 'EUR' })
 */
export function trackConversion(
  eventName: string,
  metaEvent: 'Lead' | 'Contact' | 'Schedule' | 'Purchase' | 'CompleteRegistration' | 'ViewContent',
  params: TrackParams = {}
) {
  trackEvent(eventName, params);
  try {
    if (typeof window.fbq === 'function') {
      window.fbq('track', metaEvent, params);
    }
  } catch {
    /* ignore */
  }
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[conversion]', eventName, metaEvent, params);
  }
}
