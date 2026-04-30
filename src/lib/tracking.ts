/**
 * Conversion-Tracking Helper.
 *
 * Architektur: Google Tag Manager (GTM-NTNNDTMQ) regiert GA4.
 * - Das GTM-Snippet und der Consent-Mode-v2-Default werden direkt in index.html geladen.
 * - GA4-Messung (G-VEFRVXT0HK) läuft über den GTM-Container via Google-Tag.
 * - Events werden als dataLayer.push an GTM übergeben (trackEvent).
 * - Meta Pixel bleibt optional und wird bei marketing-Consent separat geladen.
 *
 * ============================================================
 * PII & Enhanced Conversions — Kurzanleitung
 * ============================================================
 * Klartext-PII darf NIE in den dataLayer oder in Event-Parameter
 * geschrieben werden. Erlaubt sind ausschließlich:
 *
 *   1) PII-freie Event-Parameter via `trackEvent(name, params)` —
 *      z.B. `ziel`, `lead_type`, `form_id`, `has_phone` (boolean).
 *
 *   2) Gehashte PII im dedizierten `user_data`-Slot von Google
 *      Enhanced Conversions, gebaut über `buildHashedUserData(...)`.
 *      NUR mit `marketing`-Consent senden (siehe Beispiel unten).
 *
 * Erlaubte Eingabefelder für `buildHashedUserData` (LeadUserDataInput):
 *
 *   | Eingabefeld | Normalisierung                      | Output-Key (SHA-256 hex)  |
 *   |-------------|-------------------------------------|---------------------------|
 *   | email       | trim + toLowerCase                  | sha256_email_address      |
 *   | first_name  | trim + toLowerCase                  | sha256_first_name         |
 *   | last_name   | trim + toLowerCase                  | sha256_last_name          |
 *   | phone       | nur Ziffern, E.164 (+49 für DE 0…)  | sha256_phone_number       |
 *
 * Felder mit leerem/zu kurzem Wert werden weggelassen — es landet
 * also kein Hash eines leeren Strings im Payload.
 *
 * NICHT erlaubt (weder Klartext noch Hash): Adresse, Geburtsdatum,
 * IP-Adresse, freie Nachricht, Firmenname mit Personenbezug,
 * interne DB-IDs. Diese Felder gehören NICHT in `user_data`.
 *
 * ------------------------------------------------------------
 * Beispiel — Lead-Submit mit Enhanced Conversions:
 * ------------------------------------------------------------
 *   import {
 *     buildHashedUserData,
 *     gtagSendEventAndNavigate,
 *     readConsent,
 *   } from '@/lib/tracking';
 *
 *   const consent = readConsent();
 *   const userData = consent?.marketing
 *     ? await buildHashedUserData({
 *         email: form.email,           // → sha256_email_address
 *         first_name: form.first_name, // → sha256_first_name
 *         last_name: form.last_name,   // → sha256_last_name
 *         phone: form.phone,           // → sha256_phone_number (E.164)
 *       })
 *     : undefined;
 *
 *   gtagSendEventAndNavigate('lead_submit_potenzialanalyse', '/danke/kontakt', {
 *     params: {                        // PII-frei, landet im dataLayer
 *       event_category: 'lead',
 *       ziel: 'potenzialanalyse',
 *       form_id: 'kontakt',
 *       has_phone: form.phone.length > 0,
 *     },
 *     userData,                        // gehasht, NUR im gtag user_data-Slot
 *     onNavigate: (url) => navigate(url),
 *   });
 *
 * Ergebnis:
 *   • dataLayer.push({ event: 'lead_submit_potenzialanalyse', ziel, form_id, … })
 *   • gtag('event', 'lead_submit_potenzialanalyse', { …params, user_data: {
 *       sha256_email_address: '…', sha256_phone_number: '…', … } })
 * ============================================================
 */

// ============================================================
// Konstanten — dokumentarisch und für Referenz
// ============================================================
export const GTM_CONTAINER_ID = 'GTM-NTNNDTMQ';
export const GA4_MEASUREMENT_ID = 'G-VEFRVXT0HK';
export const META_PIXEL_ID = '946900904715972';
export const APOLLO_APP_ID = '69eaf28dcab75b0011d9e969';
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
    __apolloLoaded?: boolean;
    trackingFunctions?: { onLoad?: (opts: { appId: string }) => void };
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

/** Lädt Apollo.io Website-Tracker (wenn marketing-Consent). */
export function loadApolloTracker() {
  if (typeof window === 'undefined' || window.__apolloLoaded) return;
  if (isPlaceholder(APOLLO_APP_ID)) return;
  window.__apolloLoaded = true;

  const nocache = Math.random().toString(36).substring(7);
  const s = document.createElement('script');
  s.src = `https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=${nocache}`;
  s.async = true;
  s.defer = true;
  s.onload = () => {
    try {
      window.trackingFunctions?.onLoad?.({ appId: APOLLO_APP_ID });
    } catch {
      /* ignore */
    }
  };
  document.head.appendChild(s);
}

/**
 * Wendet einen Consent-State an:
 *  - Consent-Mode-v2-Update an GTM / Google
 *  - Meta Pixel laden wenn marketing-Consent
 *  - Apollo.io Website-Tracker laden wenn marketing-Consent
 *
 * GA4 wird durch GTM selbst gesteuert, wir senden nur das Consent-Signal.
 */
export function applyConsent(state: ConsentState) {
  gtagConsentUpdate(state);
  if (state.marketing) {
    loadMetaPixel();
    loadApolloTracker();
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[tracking] consent applied', state, {
      metaActive: !!window.__metaLoaded,
      apolloActive: !!window.__apolloLoaded,
    });
  }
}

/** Beim App-Start: gespeicherten Consent anwenden. */
export function initTrackingIfConsented() {
  const state = readConsent();
  if (state) applyConsent(state);
}

/**
 * Prüft Event-Parameter auf Klartext-PII. Gibt eine Liste der Verstöße
 * zurück (leeres Array = sauber). Wird vor jedem dataLayer-Push und vor
 * jedem gtag('event', …)-Call ausgeführt.
 *
 * Erkennt:
 *   • E-Mail-Adressen (… @ …)
 *   • Telefonnummern (≥ 7 zusammenhängende Ziffern, optional mit „+")
 *   • Verbotene Schlüssel (email, phone, first_name, last_name, name,
 *     address, postal_code, city, dob, ip, user_id, customer_id, …)
 *
 * Bei Verstoß wird der Call blockiert und in DEV ein console.error geloggt.
 */
const FORBIDDEN_PARAM_KEYS = new Set<string>([
  'email', 'e_mail', 'mail',
  'phone', 'phone_number', 'tel', 'mobile',
  'first_name', 'last_name', 'name', 'full_name', 'vorname', 'nachname',
  'address', 'street', 'postal_code', 'zip', 'city', 'country',
  'dob', 'birthday', 'birth_date',
  'ip', 'ip_address',
  'user_id', 'customer_id', 'client_id',
]);
const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE_RE = /(?:\+|00)?\d[\d\s().-]{6,}\d/;

export function assertNoPiiInParams(
  params: TrackParams,
): { ok: true } | { ok: false; reasons: string[] } {
  const reasons: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    const lowerKey = key.toLowerCase();
    if (FORBIDDEN_PARAM_KEYS.has(lowerKey)) {
      reasons.push(`forbidden key: "${key}"`);
      continue;
    }
    if (typeof value !== 'string') continue;
    // Bereits gehashte Werte (sha256_…) sind explizit erlaubt — sie landen
    // ohnehin nicht in `params`, sondern im separaten user_data-Slot.
    if (lowerKey.startsWith('sha256_')) continue;
    if (EMAIL_RE.test(value)) reasons.push(`email-like value in "${key}"`);
    else if (PHONE_RE.test(value)) reasons.push(`phone-like value in "${key}"`);
  }
  return reasons.length ? { ok: false, reasons } : { ok: true };
}

/**
 * Generisches Event an den dataLayer pushen — GTM fängt es ab
 * und leitet es an GA4 / Ads / Meta weiter (gemäß Container-Konfiguration).
 *
 * BLOCKIERT den Call, wenn `params` Klartext-PII enthält (siehe
 * `assertNoPiiInParams`). PII gehört ausschließlich gehasht in
 * `user_data` via `buildHashedUserData`.
 */
export function trackEvent(event: string, params: TrackParams = {}) {
  const check = assertNoPiiInParams(params);
  if (check.ok === false) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('[track] BLOCKED — PII in params:', event, check.reasons, params);
    }
    return;
  }
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
 * DSGVO-/Google-konformes Hashing für Enhanced Conversions.
 *
 * Personenbezogene Daten (Name, E-Mail, Telefon) dürfen NICHT als Klartext
 * an Google Ads / GA4 übergeben werden. Stattdessen werden sie hier:
 *   1. normalisiert (lowercase, getrimmt, Telefon E.164-bereinigt)
 *   2. SHA-256 gehasht (Web Crypto, läuft lokal im Browser)
 *   3. nur in den dafür vorgesehenen `user_data`-Feldern übergeben
 *
 * Hashes verlassen den Browser nur, wenn marketing-Consent erteilt wurde
 * (siehe Aufrufer in Kontakt.tsx / Posteingang.tsx).
 */
async function sha256Hex(input: string): Promise<string> {
  if (
    typeof window === 'undefined' ||
    typeof window.crypto === 'undefined' ||
    !window.crypto.subtle
  ) {
    return '';
  }
  const data = new TextEncoder().encode(input);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export type LeadUserDataInput = {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
};

/**
 * Erzeugt das `user_data`-Objekt für Google Enhanced Conversions.
 * Alle Felder werden vor dem Hash normalisiert. Leere Werte werden
 * weggelassen, damit kein leerer Hash übermittelt wird.
 */
export async function buildHashedUserData(
  input: LeadUserDataInput
): Promise<Record<string, string>> {
  const out: Record<string, string> = {};

  const email = input.email?.trim().toLowerCase();
  if (email) {
    const h = await sha256Hex(email);
    if (h) out.sha256_email_address = h;
  }

  const firstName = input.first_name?.trim().toLowerCase();
  if (firstName) {
    const h = await sha256Hex(firstName);
    if (h) out.sha256_first_name = h;
  }

  const lastName = input.last_name?.trim().toLowerCase();
  if (lastName) {
    const h = await sha256Hex(lastName);
    if (h) out.sha256_last_name = h;
  }

  // Telefon → E.164 (Google empfiehlt diese Form für Enhanced Conversions).
  // Regeln (in dieser Reihenfolge):
  //   1) „+…"  → bereits international, nur Ziffern säubern.
  //   2) „00…" → internationaler Präfix (z.B. „0049 151…") → „+49 151…".
  //   3) „0…"  → nationale Form mit Default-Country-Code ersetzen (DE: +49).
  //   4) Sonst → nackte internationale Form (z.B. „4915112345678") → „+…".
  // Plausibilität: 8–15 Ziffern Gesamtlänge (E.164-Limit).
  const DEFAULT_CC = '49'; // Deutschland
  const raw = input.phone?.trim() ?? '';
  if (raw) {
    const hasPlus = raw.startsWith('+');
    const digits = raw.replace(/\D/g, '');
    let e164: string | null = null;

    if (hasPlus && digits.length >= 8) {
      e164 = '+' + digits;
    } else if (digits.startsWith('00') && digits.length >= 10) {
      e164 = '+' + digits.slice(2);
    } else if (digits.startsWith('0') && digits.length >= 7) {
      e164 = '+' + DEFAULT_CC + digits.slice(1);
    } else if (digits.length >= 10 && digits.length <= 15) {
      // Nackte internationale Form ohne „+", z.B. „4915112345678".
      e164 = '+' + digits;
    }

    // E.164 erlaubt max. 15 Ziffern → max. 16 Zeichen inkl. „+".
    if (e164 && e164.length >= 9 && e164.length <= 16) {
      const h = await sha256Hex(e164);
      if (h) out.sha256_phone_number = h;
    }
  }

  return out;
}

/**
 * Sendet ein gtag-Event und navigiert anschließend zur übergebenen URL.
 * Wartet max. `timeout` ms auf den event_callback, damit die Conversion
 * sicher übermittelt wird, bevor der Browser navigiert. Funktioniert für
 * interne SPA-Routen (via `onNavigate`-Callback, z.B. React-Router) und
 * für externe URLs (window.location-Fallback).
 *
 * `userData` ist optional und wird – falls gesetzt – als `user_data`
 * (Enhanced Conversions) übergeben. Es MUSS bereits gehasht sein
 * (siehe `buildHashedUserData`).
 */
export function gtagSendEventAndNavigate(
  eventName: string,
  url: string,
  options: {
    params?: TrackParams;
    timeout?: number;
    onNavigate?: (url: string) => void;
    userData?: Record<string, string>;
  } = {}
) {
  const { params = {}, timeout = 2000, onNavigate, userData } = options;

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

  // PII-Guard: blockiert den kompletten Conversion-Call (dataLayer + gtag),
  // wenn `params` Klartext-PII enthält. Verhindert versehentliches Leaken
  // an GA4/Ads. Hashed PII gehört in `userData`, nicht in `params`.
  const piiCheck = assertNoPiiInParams(params);
  if (piiCheck.ok === false) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error(
        '[gtagNav] BLOCKED — PII in params, navigating ohne Conversion:',
        eventName,
        piiCheck.reasons,
      );
    }
    // Trotzdem navigieren, damit der UX-Flow nicht hängenbleibt.
    if (onNavigate) onNavigate(url);
    else if (typeof window !== 'undefined') window.location.href = url;
    return false;
  }

  // Zusätzlich in dataLayer pushen (PII-frei – nur Event-Parameter).
  trackEvent(eventName, params);

  // Sicherheitsnetz IMMER scharf schalten – auch bei Adblockern, fehlendem
  // Netzwerk oder wenn gtag den Callback verschluckt: nach `timeout` ms
  // wird trotzdem navigiert.
  if (typeof window !== 'undefined') {
    fallbackTimer = setTimeout(() => go('timeout'), timeout);
  }

  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      const payload: Record<string, unknown> = {
        ...params,
        event_callback: () => go('callback'),
        event_timeout: timeout,
      };
      // Enhanced Conversions: gehashte PII NUR im dedizierten user_data-Slot.
      if (userData && Object.keys(userData).length > 0) {
        payload.user_data = userData;
      }
      window.gtag('event', eventName, payload);
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
