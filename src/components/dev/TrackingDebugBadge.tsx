/**
 * TrackingDebugBadge
 * ---------------------------------------
 * Sichtbar NUR im DEV-Modus (`import.meta.env.DEV`).
 * Zeigt live an, ob:
 *   - Marketing-/Analytics-Consent erteilt ist
 *   - Meta Pixel (fbq) tatsächlich initialisiert wurde
 *   - Apollo.io-Tracker-Script wirklich im DOM hängt
 *
 * Der Badge reagiert auf `cookie-consent-changed`-Events und pollt
 * zusätzlich kurz, um asynchrones Skript-Loading abzubilden.
 */
import { useEffect, useState } from 'react';
import {
  CONSENT_CHANGED_EVENT,
  readConsent,
  type ConsentState,
} from '@/lib/tracking';

type LoadStatus = 'idle' | 'pending' | 'loaded';

type TrackerStatus = {
  consent: ConsentState | null;
  meta: LoadStatus;
  apollo: LoadStatus;
};

const APOLLO_SRC_HINT = 'assets.apollo.io/micro/website-tracker';

function getStatus(): TrackerStatus {
  const consent = readConsent();

  // Meta Pixel: window.fbq ist nach Init eine Funktion mit .loaded === true
  const fbq = window.fbq as
    | (((...args: unknown[]) => void) & { loaded?: boolean })
    | undefined;
  const metaScriptPresent = !!document.querySelector(
    'script[src*="connect.facebook.net/en_US/fbevents.js"]',
  );
  let meta: LoadStatus = 'idle';
  if (window.__metaLoaded || metaScriptPresent) {
    meta = typeof fbq === 'function' && fbq.loaded ? 'loaded' : 'pending';
  }

  // Apollo: prüft DOM-Script-Tag UND Flag
  const apolloScriptPresent = !!document.querySelector(
    `script[src*="${APOLLO_SRC_HINT}"]`,
  );
  let apollo: LoadStatus = 'idle';
  if (window.__apolloLoaded || apolloScriptPresent) {
    apollo =
      typeof window.trackingFunctions?.onLoad === 'function' || apolloScriptPresent
        ? apolloScriptPresent && typeof window.trackingFunctions?.onLoad === 'function'
          ? 'loaded'
          : 'pending'
        : 'pending';
  }

  return { consent, meta, apollo };
}

const STATUS_STYLES: Record<LoadStatus, { dot: string; label: string }> = {
  idle: { dot: 'bg-muted-foreground/40', label: 'inaktiv' },
  pending: { dot: 'bg-yellow-500 animate-pulse', label: 'lädt…' },
  loaded: { dot: 'bg-green-500', label: 'aktiv' },
};

export function TrackingDebugBadge() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<TrackerStatus>(() => ({
    consent: null,
    meta: 'idle',
    apollo: 'idle',
  }));

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    let pollCount = 0;
    let pollTimer: ReturnType<typeof setInterval> | null = null;

    const refresh = () => setStatus(getStatus());

    const startPolling = () => {
      if (pollTimer) return;
      pollCount = 0;
      pollTimer = setInterval(() => {
        pollCount += 1;
        refresh();
        // Stop nach ~10s (20 × 500ms) — Skripte sind dann längst geladen
        if (pollCount >= 20 && pollTimer) {
          clearInterval(pollTimer);
          pollTimer = null;
        }
      }, 500);
    };

    refresh();
    startPolling();

    const handleConsentChange = () => {
      refresh();
      startPolling();
    };

    window.addEventListener(CONSENT_CHANGED_EVENT, handleConsentChange);
    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, handleConsentChange);
      if (pollTimer) clearInterval(pollTimer);
    };
  }, []);

  if (!import.meta.env.DEV) return null;

  const consentLabel = status.consent
    ? `A:${status.consent.analytics ? '✓' : '✗'}  M:${status.consent.marketing ? '✓' : '✗'}`
    : 'kein Consent';

  return (
    <div className="fixed bottom-4 right-4 z-[70] font-mono text-[11px] select-none">
      {open ? (
        <div className="bg-background/95 backdrop-blur border border-border rounded-lg shadow-2xl p-3 w-64">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-foreground text-xs">
              🛠 Tracking Debug
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground px-1"
              aria-label="Debug schließen"
            >
              ×
            </button>
          </div>

          <div className="space-y-2">
            <Row label="Consent" value={consentLabel} />
            <TrackerRow label="Meta Pixel" status={status.meta} />
            <TrackerRow label="Apollo.io" status={status.apollo} />
          </div>

          <p className="mt-3 pt-2 border-t border-border text-[10px] text-muted-foreground leading-snug">
            Nur DEV. Lädt erst bei Marketing-Consent.
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="bg-background/90 backdrop-blur border border-border rounded-full shadow-lg px-3 py-1.5 flex items-center gap-2 hover:bg-background transition"
          aria-label="Tracking-Debug öffnen"
        >
          <span className="text-muted-foreground">🛠</span>
          <span className={`w-2 h-2 rounded-full ${STATUS_STYLES[status.meta].dot}`} />
          <span className="text-muted-foreground">M</span>
          <span className={`w-2 h-2 rounded-full ${STATUS_STYLES[status.apollo].dot}`} />
          <span className="text-muted-foreground">A</span>
        </button>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

function TrackerRow({ label, status }: { label: string; status: LoadStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${s.dot}`} />
        <span className="text-foreground">{s.label}</span>
      </span>
    </div>
  );
}
