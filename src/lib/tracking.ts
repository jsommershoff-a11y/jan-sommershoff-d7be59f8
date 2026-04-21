/**
 * Conversion-Tracking Helper für GA4 + Meta Pixel.
 *
 * - Lädt Scripts erst NACH Cookie-Consent (DSGVO-konform).
 * - Granularer Consent: Analytics (GA4) + Marketing (Meta Pixel) getrennt.
 * - IDs als Platzhalter — bitte unten eintragen.
 */

// ============================================================
// 👉 HIER DEINE IDs EINTRAGEN
// ============================================================
export const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // z.B. G-ABC123DEF4
export const META_PIXEL_ID = 'XXXXXXXXXXXXXXXX';  // 15-16-stellige Zahl
// ============================================================

type TrackParams = Record<string, string | number | boolean | undefined>;

export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
};

export const CONSENT_STORAGE_KEY = 'cookie-consent-v2';
export const CONSENT_LEGACY_KEY = 'cookie-consent';
export const CONSENT_CHANGED_EVENT = 'cookie-consent-changed';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };
    _fbq?: unknown;
    __ga4Loaded?: boolean;
    __metaLoaded?: boolean;
  }
}

const isPlaceholder = (id: string) => id.includes('XXXX');

export function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'object' && parsed !== null) {
        return {
          analytics: !!parsed.analytics,
          marketing: !!parsed.marketing,
        };
      }
    }
    // Legacy migration
    const legacy = localStorage.getItem(CONSENT_LEGACY_KEY);
    if (legacy === 'accepted') return { analytics: true, marketing: true };
    if (legacy === 'declined') return { analytics: false, marketing: false };
  } catch {
    /* ignore */
  }
  return null;
}

export function writeConsent(state: ConsentState) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
    // Legacy-Key für Rückwärtskompatibilität
    localStorage.setItem(
      CONSENT_LEGACY_KEY,
      state.analytics || state.marketing ? 'accepted' : 'declined',
    );
  } catch {
    /* ignore */
  }
  applyConsent(state);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: state }));
  }
}

/** Lädt nur GA4. */
export function loadGA4() {
  if (typeof window === 'undefined' || window.__ga4Loaded) return;
  if (isPlaceholder(GA4_MEASUREMENT_ID)) return;
  window.__ga4Loaded = true;

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

/** Lädt nur Meta Pixel. */
export function loadMetaPixel() {
  if (typeof window === 'undefined' || window.__metaLoaded) return;
  if (isPlaceholder(META_PIXEL_ID)) return;
  window.__metaLoaded = true;

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

/** Wendet einen Consent-State an: lädt zugestimmte Scripts. */
export function applyConsent(state: ConsentState) {
  if (state.analytics) loadGA4();
  if (state.marketing) loadMetaPixel();

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[tracking] consent applied', state, {
      ga4Active: !!window.__ga4Loaded,
      metaActive: !!window.__metaLoaded,
    });
  }
}

/** Beim App-Start: gespeicherten Consent anwenden. */
export function initTrackingIfConsented() {
  const state = readConsent();
  if (state) applyConsent(state);
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

/** Backwards-compat: lädt alle Scripts (volle Zustimmung). */
export function loadTrackingScripts() {
  applyConsent({ analytics: true, marketing: true });
}
