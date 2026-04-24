import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Test-Route /test/conversion
 *
 * Validiert, dass `conversion_event_submit_lead_form_2` auf der Danke-Seite
 * NUR EINMAL pro erfolgreichem Submit gefeuert wird.
 *
 * Schritte:
 *  1. "Submit simulieren" → setzt conversion_params + räumt Dedup-Keys auf
 *     und navigiert zu /danke/kontakt → Event MUSS feuern (1×).
 *  2. "Danke-Seite erneut öffnen (Reload simulieren)" → kein neuer Submit,
 *     Dedup-Key gesetzt → Event darf NICHT erneut feuern.
 *
 * Lauscht auf gtag-Calls via Monkey-Patch und zählt Vorkommen des Events.
 */

const EVENT_NAME = 'conversion_event_submit_lead_form_2';
const PAGE_PATH = '/danke/kontakt';
const LEAD_ACK_KEY = `lead_form_conversion_ack:${PAGE_PATH}:${EVENT_NAME}`;

type LogEntry = { ts: string; level: 'info' | 'ok' | 'warn' | 'err'; msg: string };

declare global {
  interface Window {
    __conversionTestCount?: number;
    __conversionTestPatched?: boolean;
    __conversionTestOrigGtag?: (...args: unknown[]) => void;
  }
}

export default function TestConversion() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [count, setCount] = useState<number>(window.__conversionTestCount ?? 0);
  const pollRef = useRef<number | null>(null);

  const log = (level: LogEntry['level'], msg: string) => {
    setLogs((l) => [
      ...l,
      { ts: new Date().toLocaleTimeString(), level, msg },
    ]);
  };

  // gtag patchen, um Aufrufe zu zählen
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!window.__conversionTestPatched) {
      window.__conversionTestCount = window.__conversionTestCount ?? 0;
      const orig = window.gtag;
      window.__conversionTestOrigGtag = orig;

      const patched: typeof window.gtag = function (...args: unknown[]) {
        try {
          if (args[0] === 'event' && args[1] === EVENT_NAME) {
            window.__conversionTestCount = (window.__conversionTestCount ?? 0) + 1;
            // eslint-disable-next-line no-console
            console.info('[TestConversion] gtag event captured', args);
          }
        } catch { /* ignore */ }
        if (typeof orig === 'function') {
          // @ts-expect-error - forward args
          return orig.apply(window, args);
        }
        // Falls gtag noch nicht da ist, fallback auf dataLayer
        (window.dataLayer = window.dataLayer || []).push(args);
      } as typeof window.gtag;

      window.gtag = patched;
      window.__conversionTestPatched = true;
    }

    // Live-Polling der Zählung
    pollRef.current = window.setInterval(() => {
      setCount(window.__conversionTestCount ?? 0);
    }, 300);

    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, []);

  const resetState = () => {
    try {
      sessionStorage.removeItem(LEAD_ACK_KEY);
      sessionStorage.removeItem(`conversion_ack:${PAGE_PATH}`);
      sessionStorage.removeItem('conversion_params');
    } catch { /* ignore */ }
    window.__conversionTestCount = 0;
    setCount(0);
    setLogs([]);
    log('info', 'State zurückgesetzt (Dedup-Keys + Counter).');
  };

  const simulateSubmit = () => {
    const before = window.__conversionTestCount ?? 0;
    try {
      // 1) Reset Dedup, damit ein "frischer" Submit simuliert wird
      sessionStorage.removeItem(LEAD_ACK_KEY);
      sessionStorage.removeItem(`conversion_ack:${PAGE_PATH}`);

      // 2) conversion_params setzen wie ein echtes Formular
      const params = {
        event_category: 'lead',
        event_label: 'test_submit',
        lead_type: 'kontaktformular',
        form_id: 'kontakt_form_test',
        ziel: 'potenzialanalyse',
      };
      sessionStorage.setItem('conversion_params', JSON.stringify(params));
      log('info', `Submit simuliert. Counter vor Navigation: ${before}.`);
      log('info', 'Navigiere zu /danke/kontakt …');
      navigate('/danke/kontakt');
    } catch (e) {
      log('err', `Fehler: ${(e as Error).message}`);
    }
  };

  const reopenThankYou = () => {
    const before = window.__conversionTestCount ?? 0;
    log(
      'info',
      `Öffne /danke/kontakt erneut OHNE neuen Submit. Counter vor Navigation: ${before}. Erwartung: Counter bleibt unverändert.`,
    );
    navigate('/danke/kontakt');
  };

  const checkResult = () => {
    const c = window.__conversionTestCount ?? 0;
    if (c === 1) {
      log('ok', `✅ PASS — Event "${EVENT_NAME}" wurde genau 1× gefeuert.`);
    } else if (c === 0) {
      log(
        'warn',
        `⚠️ Noch nicht gefeuert (Counter=0). Hast du Schritt 1 (Submit simulieren) ausgeführt?`,
      );
    } else {
      log(
        'err',
        `❌ FAIL — Event wurde ${c}× gefeuert. Deduplication greift nicht.`,
      );
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Conversion-Event Dedup-Test
        </h1>
        <p className="text-muted-foreground mb-6">
          Validiert, dass <code className="px-1 py-0.5 rounded bg-muted">{EVENT_NAME}</code>{' '}
          auf <code className="px-1 py-0.5 rounded bg-muted">{PAGE_PATH}</code> nur
          einmal pro erfolgreichem Submit feuert.
        </p>

        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Counter (gemessene gtag-Calls):</span>
            <span
              className={`text-2xl font-bold ${
                count === 1 ? 'text-primary' : count > 1 ? 'text-destructive' : 'text-foreground'
              }`}
            >
              {count}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={simulateSubmit}
              className="px-4 h-11 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
            >
              1. Submit simulieren → /danke/kontakt
            </button>
            <button
              onClick={reopenThankYou}
              className="px-4 h-11 rounded-md bg-accent text-white font-semibold hover:opacity-90 transition"
            >
              2. Danke-Seite erneut öffnen
            </button>
            <button
              onClick={checkResult}
              className="px-4 h-11 rounded-md border border-border text-foreground font-medium hover:bg-muted transition"
            >
              Ergebnis prüfen
            </button>
            <button
              onClick={resetState}
              className="px-4 h-11 rounded-md border border-border text-foreground font-medium hover:bg-muted transition"
            >
              Zurücksetzen
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-semibold text-foreground mb-3">Log</h2>
          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Noch keine Aktionen. Starte mit Schritt 1.
            </p>
          ) : (
            <ul className="space-y-1 text-sm font-mono">
              {logs.map((l, i) => (
                <li
                  key={i}
                  className={
                    l.level === 'ok'
                      ? 'text-primary'
                      : l.level === 'err'
                      ? 'text-destructive'
                      : l.level === 'warn'
                      ? 'text-accent'
                      : 'text-foreground'
                  }
                >
                  <span className="text-muted-foreground mr-2">[{l.ts}]</span>
                  {l.msg}
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          Hinweis: Diese Route ist nur für interne QA gedacht und nicht in der Sitemap.
        </p>
      </div>
    </main>
  );
}
