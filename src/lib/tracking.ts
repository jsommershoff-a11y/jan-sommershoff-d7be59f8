/**
 * Conversion-Tracking Helper.
 *
 * Architektur: Google Tag Manager (GTM-NTNNDTMQ) regiert GA4.
 * - Das GTM-Snippet und der Consent-Mode-v2-Default werden direkt in index.html geladen.
 * - GA4-Messung (G-VEFRVXT0HK) läuft über den GTM-Container via Google-Tag.
 * - Events werden als dataLayer.push an GTM übergeben (trackEvent).
 * - Meta Pixel bleibt optional und wird bei marketing-Consent separat geladen.
 */

// ============================================================
// Konstanten — dokumentarisch und für Referenz
// ============================================================
export const GTM_CONTAINER_ID = 'GTM-NTNNDTMQ';
export const GA4_MEASUREMENT_ID = 'G-VEFRVXT0HK';
export const META_PIXEL_ID = '946900904715972';
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
    __metaLoaded?: boolean;
  }
}

const isPlaceholder = (id: string) => id.includes('XXXX');

/** dataLayer + gtag-Stub sicherstellen (GTM bootet dataLayer bereits in index.html). */
function ensureGtagStub() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args as unknown as Record<string, unknown>);
    };
  }
}

/**
 * Consent-Update an Google Consent Mode v2 senden.
 * Der Default („denied") wird bereits in index.html gesetzt, BEVOR GTM lädt.
 */
function gtagConsentUpdate(state: ConsentState) {
  if (typeof window === 'undefined') return;
  ensureGtagStub();
  window.gtag!('consent', 'update', {
    ad_storage: state.marketing ? 'granted' : 'denied',
    ad_user_data: state.marketing ? 'granted' : 'denied',
    ad_personalization: state.marketing ? 'granted' : 'denied',
    analytics_storage: state.analytics ? 'granted' : 'denied',
  });
}

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

/** Lädt Meta Pixel (wenn marketing-Consent und Pixel-ID gesetzt). */
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

/**
 * Wendet einen Consent-State an:
 *  - Consent-Mode-v2-Update an GTM / Google
 *  - Meta Pixel laden wenn marketing-Consent
 *
 * GA4 wird durch GTM selbst gesteuert, wir senden nur das Consent-Signal.
 */
export function applyConsent(state: ConsentState) {
  gtagConsentUpdate(state);
  if (state.marketing) loadMetaPixel();

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[tracking] consent applied', state, {
      metaActive: !!window.__metaLoaded,
    });
  }
}

/** Beim App-Start: gespeicherten Consent anwenden. */
export function initTrackingIfConsented() {
  const state = readConsent();
  if (state) applyConsent(state);
}

/**
 * Generisches Event an den dataLayer pushen — GTM fängt es ab
 * und leitet es an GA4 / Ads / Meta weiter (gemäß Container-Konfiguration).
 */
export function trackEvent(event: string, params: TrackParams = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
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
}

/**
 * Triggert eine Conversion auf GA4 (via GTM) + Meta Pixel (direkt) gleichzeitig.
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

/**
 * Sendet ein gtag-Event und navigiert anschließend zur übergebenen URL.
 * Wartet max. `timeout` ms auf den event_callback, damit die Conversion
 * sicher übermittelt wird, bevor der Browser navigiert. Funktioniert für
 * interne SPA-Routen (via `onNavigate`-Callback, z.B. React-Router) und
 * für externe URLs (window.location-Fallback).
 */
export function gtagSendEventAndNavigate(
  eventName: string,
  url: string,
  options: { params?: TrackParams; timeout?: number; onNavigate?: (url: string) => void } = {}
) {
  const { params = {}, timeout = 2000, onNavigate } = options;

  let navigated = false;
  let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

  const go = (reason: 'callback' | 'timeout' | 'no_gtag' | 'error' = 'callback') => {
    if (navigated) return;
    navigated = true;
    if (fallbackTimer !== undefined) {
      clearTimeout(fallbackTimer);
      fallbackTimer = undefined;
    }
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug('[gtagNav]', eventName, '→', url, '(', reason, ')');
    }
    if (onNavigate) onNavigate(url);
    else if (typeof window !== 'undefined') window.location.href = url;
  };

  // Zusätzlich in dataLayer pushen, damit GTM-Trigger greifen.
  trackEvent(eventName, params);

  // Sicherheitsnetz IMMER scharf schalten – auch bei Adblockern, fehlendem
  // Netzwerk oder wenn gtag den Callback verschluckt: nach `timeout` ms
  // wird trotzdem navigiert.
  if (typeof window !== 'undefined') {
    fallbackTimer = window.setTimeout(() => go('timeout'), timeout);
  }

  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        ...params,
        event_callback: () => go('callback'),
        event_timeout: timeout,
      });
      return false;
    }
    // Kein gtag verfügbar → Fallback-Timer läuft bereits, kein Sofort-Sprung.
  } catch {
    // Fehler beim gtag-Aufruf → ebenfalls Timer abwarten, statt sofort zu
    // springen, damit dataLayer-Push noch verarbeitet werden kann.
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug('[gtagNav] gtag threw, waiting for timeout');
    }
  }
  return false;
}

/** Backwards-compat: volle Zustimmung anwenden. */
export function loadTrackingScripts() {
  applyConsent({ analytics: true, marketing: true });
}

/**
 * Alias für alten Code, der noch `loadGA4` importiert haben könnte.
 * GA4 wird jetzt durch GTM geladen — diese Funktion ist ein No-op,
 * gibt aber in DEV einen Hinweis.
 */
export function loadGA4() {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[tracking] loadGA4() ist ein No-op — GA4 läuft über GTM (' + GTM_CONTAINER_ID + ').');
  }
}
