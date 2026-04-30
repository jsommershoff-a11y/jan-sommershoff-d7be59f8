/**
 * ConsentAuditLog
 * ---------------------------------------
 * Zeigt den Nutzern transparent an, welche Cookie-Entscheidung sie wann
 * getroffen haben — inkl. Verlauf der letzten N Änderungen.
 *
 * Datenquelle: localStorage (cookie-consent-v2 + cookie-consent-history),
 * gepflegt von src/lib/tracking.ts. Reagiert live auf Consent-Änderungen.
 *
 * DSGVO-Mehrwert:
 *  • Art. 7 Abs. 1 DSGVO — Nachweisbarkeit der Einwilligung
 *  • Art. 7 Abs. 3 DSGVO — Widerruf so einfach wie Erteilung (Verlauf zeigt beides)
 */
import { useCallback, useEffect, useState } from 'react';
import { Clock, Download, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openCookieSettings } from '@/components/CookieBanner';
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_VERSION,
  clearConsentHistory,
  readConsentHistory,
  readStoredConsent,
  type ConsentHistoryEntry,
  type ConsentSource,
  type StoredConsent,
} from '@/lib/tracking';
import { AVV_REGISTRY } from '@/data/avvRegistry';

const SOURCE_LABELS: Record<ConsentSource, string> = {
  banner_accept_all: 'Banner: Alle akzeptiert',
  banner_decline_all: 'Banner: Alle abgelehnt',
  settings_save: 'Einstellungen: Auswahl gespeichert',
  settings_accept_all: 'Einstellungen: Alle akzeptiert',
  settings_decline_all: 'Einstellungen: Alle abgelehnt',
  legacy_migration: 'Altdaten-Migration',
  programmatic: 'Programmatisch',
};

function formatTimestamp(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime()) || d.getFullYear() < 2020) return '—';
    return new Intl.DateTimeFormat('de-DE', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(d);
  } catch {
    return iso;
  }
}

function vendorName(id: string): string {
  return AVV_REGISTRY.find((a) => a.id === id)?.vendor ?? id;
}

export function ConsentAuditLog() {
  const [current, setCurrent] = useState<StoredConsent | null>(null);
  const [history, setHistory] = useState<ConsentHistoryEntry[]>([]);
  const [showAll, setShowAll] = useState(false);

  const refresh = useCallback(() => {
    setCurrent(readStoredConsent());
    setHistory(readConsentHistory());
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(CONSENT_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, refresh);
  }, [refresh]);

  const handleExport = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      schemaVersion: CONSENT_VERSION,
      current,
      history,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consent-log-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearHistory = () => {
    if (
      !confirm(
        'Verlauf löschen? Die aktuell aktive Entscheidung bleibt erhalten — nur die historischen Einträge werden entfernt.',
      )
    )
      return;
    clearConsentHistory();
    refresh();
  };

  const visibleHistory = showAll ? history : history.slice(0, 5);

  return (
    <section
      id="consent-log"
      aria-labelledby="consent-log-title"
      className="rounded-xl border border-border bg-card/40 p-5 sm:p-6 scroll-mt-24"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h3
            id="consent-log-title"
            className="text-lg font-semibold text-foreground flex items-center gap-2"
          >
            <Clock className="size-5 text-primary" />
            Deine Cookie-Entscheidungen
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Lokal gespeicherte Audit-Historie deiner Zustimmungen — inkl. Meta
            Pixel und Apollo.io. Liegt nur in <em>diesem</em> Browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => openCookieSettings()}
          >
            <RefreshCw className="size-4 mr-1.5" />
            Einstellungen ändern
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleExport}
            disabled={!current && history.length === 0}
          >
            <Download className="size-4 mr-1.5" />
            JSON exportieren
          </Button>
        </div>
      </div>

      {/* Aktueller Stand */}
      {current ? (
        <div className="rounded-lg border border-border bg-background/60 p-4 mb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Aktiv seit
            </span>
            <span className="text-sm font-medium text-foreground">
              {formatTimestamp(current.timestamp)}
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-2 mb-3">
            <CategoryRow label="Analyse" granted={current.analytics} />
            <CategoryRow label="Marketing" granted={current.marketing} />
          </div>
          <ul className="space-y-1.5 text-xs">
            {current.trackers.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between gap-3 border-t border-border/50 pt-1.5 first:border-t-0 first:pt-0"
              >
                <span className="text-foreground">{vendorName(t.id)}</span>
                <StatusPill granted={t.granted} />
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-muted-foreground mt-3 pt-3 border-t border-border/50">
            Quelle: {SOURCE_LABELS[current.source]} · Schema v{current.version}
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-4 mb-4 text-sm text-muted-foreground text-center">
          Noch keine Entscheidung gespeichert — beim ersten Banner-Klick wird
          hier dein Status protokolliert.
        </div>
      )}

      {/* Verlauf */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-foreground">
            Verlauf ({history.length})
          </h4>
          {history.length > 0 && (
            <button
              type="button"
              onClick={handleClearHistory}
              className="text-xs text-muted-foreground hover:text-destructive inline-flex items-center gap-1 transition"
            >
              <Trash2 className="size-3.5" />
              Verlauf löschen
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            Keine historischen Einträge vorhanden.
          </p>
        ) : (
          <>
            <ol className="space-y-2">
              {visibleHistory.map((e, i) => (
                <li
                  key={`${e.timestamp}-${i}`}
                  className="rounded-md border border-border/70 bg-background/40 px-3 py-2 text-xs"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-mono text-muted-foreground">
                      {formatTimestamp(e.timestamp)}
                    </span>
                    <span className="text-muted-foreground">
                      {SOURCE_LABELS[e.source]}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <MiniPill label="Analyse" granted={e.analytics} />
                    <MiniPill label="Marketing" granted={e.marketing} />
                    {e.trackers
                      .filter((t) => t.category === 'marketing')
                      .map((t) => (
                        <MiniPill
                          key={t.id}
                          label={vendorName(t.id).split(' ')[0]}
                          granted={t.granted}
                        />
                      ))}
                  </div>
                </li>
              ))}
            </ol>
            {history.length > 5 && (
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="mt-3 text-xs text-accent hover:underline font-medium"
              >
                {showAll ? 'Weniger anzeigen' : `Alle ${history.length} Einträge anzeigen`}
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function CategoryRow({ label, granted }: { label: string; granted: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-muted/30 px-3 py-2">
      <span className="text-sm text-foreground">{label}</span>
      <StatusPill granted={granted} />
    </div>
  );
}

function StatusPill({ granted }: { granted: boolean }) {
  return granted ? (
    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/15 text-primary">
      Erteilt
    </span>
  ) : (
    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
      Abgelehnt
    </span>
  );
}

function MiniPill({ label, granted }: { label: string; granted: boolean }) {
  return (
    <span
      className={
        'text-[10px] px-1.5 py-0.5 rounded ' +
        (granted
          ? 'bg-primary/15 text-primary'
          : 'bg-muted text-muted-foreground')
      }
    >
      {label}: {granted ? '✓' : '✗'}
    </span>
  );
}
