import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Settings, Cookie, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  initTrackingIfConsented,
  readConsent,
  writeConsent,
  type ConsentState,
} from '@/lib/tracking';
import {
  getTrackersByCategory,
  type TrackerCategory,
} from '@/data/cookieTrackers';

const DEFAULT_CONSENT: ConsentState = { analytics: false, marketing: false };

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [savedConsent, setSavedConsent] = useState<ConsentState | null>(null);
  const [draft, setDraft] = useState<ConsentState>(DEFAULT_CONSENT);

  useEffect(() => {
    const current = readConsent();
    setSavedConsent(current);
    if (current) {
      setDraft(current);
      initTrackingIfConsented();
    } else {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Sync draft when dialog opens
  useEffect(() => {
    if (settingsOpen) {
      setDraft(savedConsent ?? DEFAULT_CONSENT);
    }
  }, [settingsOpen, savedConsent]);

  // Externer Trigger (Footer-Link etc.)
  useEffect(() => {
    const open = () => setSettingsOpen(true);
    window.addEventListener('open-cookie-settings', open);
    return () => window.removeEventListener('open-cookie-settings', open);
  }, []);

  const persist = (
    state: ConsentState,
    source: Parameters<typeof writeConsent>[1],
  ) => {
    writeConsent(state, source);
    setSavedConsent(state);
  };

  const fromBanner = visible; // Banner sichtbar = aus Initial-Banner; sonst aus Settings

  const handleAcceptAll = () => {
    persist(
      { analytics: true, marketing: true },
      fromBanner ? 'banner_accept_all' : 'settings_accept_all',
    );
    setVisible(false);
    setSettingsOpen(false);
  };

  const handleDeclineAll = () => {
    persist(
      { analytics: false, marketing: false },
      fromBanner ? 'banner_decline_all' : 'settings_decline_all',
    );
    setVisible(false);
    setSettingsOpen(false);
  };

  const handleSaveSelection = () => {
    persist(draft, 'settings_save');
    setVisible(false);
    setSettingsOpen(false);
  };

  return (
    <>
      {/* Initialer Banner */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed bottom-0 left-0 right-0 z-[60] p-3 md:p-4"
          >
            <div className="max-w-3xl mx-auto bg-background/95 backdrop-blur-lg border border-border rounded-xl p-3 sm:p-4 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <p className="text-xs sm:text-sm text-muted-foreground flex-1 leading-snug">
                  Wir verwenden Cookies für die bestmögliche Erfahrung.{' '}
                  <Link to="/datenschutz" className="text-accent hover:underline font-medium">
                    Mehr erfahren
                  </Link>
                </p>
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSettingsOpen(true)}
                    className="hidden sm:inline-flex min-h-11 px-3 text-xs"
                  >
                    Einstellungen
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeclineAll}
                    className="flex-1 sm:flex-none min-h-11 px-4 text-xs"
                  >
                    Ablehnen
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAcceptAll}
                    className="flex-1 sm:flex-none min-h-11 px-4 text-xs"
                  >
                    Akzeptieren
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistenter Settings-Button (sichtbar, wenn Banner zu) */}
      {!visible && (
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          aria-label="Cookie-Einstellungen öffnen"
          className="fixed bottom-4 left-4 z-[55] inline-flex items-center justify-center w-11 h-11 rounded-full bg-background/90 backdrop-blur border border-border shadow-lg text-muted-foreground hover:text-foreground hover:bg-background transition"
        >
          <Cookie className="size-5" />
        </button>
      )}

      {/* Settings-Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="size-5 text-primary" />
              Cookie-Einstellungen
            </DialogTitle>
            <DialogDescription className="leading-relaxed">
              Wähle granular, welche Cookies du zulassen möchtest. Du kannst
              deine Auswahl jederzeit ändern oder widerrufen.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2 max-h-[60vh] overflow-y-auto pr-1">
            {/* Notwendig */}
            <div className="rounded-lg border border-border p-3 bg-muted/40">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-foreground">Notwendig</p>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                  Immer aktiv
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Erforderlich für Betrieb &amp; Sicherheit der Website.
              </p>
              <TrackerList category="necessary" consent={savedConsent} onNavigate={() => setSettingsOpen(false)} />
            </div>

            {/* Analyse */}
            <div className="rounded-lg border border-border p-3">
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="consent-analytics"
                  className="text-sm font-semibold text-foreground cursor-pointer"
                >
                  Analyse
                </label>
                <Switch
                  id="consent-analytics"
                  checked={draft.analytics}
                  onCheckedChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Anonymisierte Reichweitenmessung &amp; Seitenaufrufe.
              </p>
              <TrackerList category="analytics" consent={savedConsent} onNavigate={() => setSettingsOpen(false)} />
            </div>

            {/* Marketing */}
            <div className="rounded-lg border border-border p-3">
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="consent-marketing"
                  className="text-sm font-semibold text-foreground cursor-pointer"
                >
                  Marketing
                </label>
                <Switch
                  id="consent-marketing"
                  checked={draft.marketing}
                  onCheckedChange={(v) => setDraft((d) => ({ ...d, marketing: v }))}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Lädt erst nach aktiver Zustimmung — Widerruf jederzeit möglich.
                Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO.
              </p>
              <div className="mt-2 flex items-start gap-2 rounded-md border border-primary/20 bg-primary/5 px-2.5 py-2">
                <ShieldCheck className="size-3.5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-[11px] leading-snug text-muted-foreground">
                  <span className="font-medium text-foreground">AVV-Status:</span>{' '}
                  Mit Apollo.io besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.{' '}
                  <Link
                    to="/datenschutz#avv-apollo"
                    onClick={() => setSettingsOpen(false)}
                    className="text-accent hover:underline font-medium"
                  >
                    Zum Apollo-Eintrag im AVV-Register
                  </Link>
                  .
                </p>
              </div>
              <TrackerList category="marketing" consent={savedConsent} onNavigate={() => setSettingsOpen(false)} />
            </div>

            <p className="text-xs text-muted-foreground">
              Details findest du in der{' '}
              <Link
                to="/datenschutz"
                onClick={() => setSettingsOpen(false)}
                className="text-accent hover:underline font-medium"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button variant="ghost" onClick={handleDeclineAll} className="min-h-11">
              Alle ablehnen
            </Button>
            <Button variant="outline" onClick={handleSaveSelection} className="min-h-11">
              Auswahl speichern
            </Button>
            <Button onClick={handleAcceptAll} className="min-h-11">
              Alle akzeptieren
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/** Helper für Footer-Links etc.: `openCookieSettings()` */
export function openCookieSettings() {
  window.dispatchEvent(new Event('open-cookie-settings'));
}

/**
 * Standardisierte Anbieterliste pro Kategorie.
 * Datenquelle: src/data/cookieTrackers.ts → src/data/avvRegistry.ts
 */
function TrackerList({
  category,
  consent,
  onNavigate,
}: {
  category: TrackerCategory;
  consent: ConsentState | null;
  onNavigate?: () => void;
}) {
  const items = getTrackersByCategory(category);
  if (items.length === 0) return null;

  const isLoaded = (cat: TrackerCategory) => {
    if (cat === 'necessary') return true;
    if (!consent) return false;
    return cat === 'analytics' ? consent.analytics : consent.marketing;
  };

  return (
    <ul className="mt-2.5 space-y-2 border-t border-border/60 pt-2.5">
      {items.map((t) => {
        const loaded = isLoaded(t.category);
        return (
          <li key={t.avvId} className="text-xs">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-medium text-foreground">{t.displayName}</span>
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground shrink-0">
                {t.retention}
              </span>
            </div>
            <p className="text-muted-foreground mt-0.5 leading-snug">
              {t.shortPurpose}
            </p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5 text-[11px] text-muted-foreground">
              <span
                className={
                  'inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full font-medium ' +
                  (loaded
                    ? 'bg-primary/15 text-primary'
                    : 'bg-muted text-muted-foreground')
                }
                aria-label={`Status: ${loaded ? 'Geladen' : 'Nicht geladen'}`}
              >
                <span
                  aria-hidden="true"
                  className={
                    'inline-block w-1.5 h-1.5 rounded-full ' +
                    (loaded ? 'bg-primary animate-pulse' : 'bg-muted-foreground/60')
                  }
                />
                {loaded ? 'Geladen' : 'Nicht geladen'}
              </span>
              <span>
                {t.avv.vendor}
                {t.avv.thirdCountry ? ` · ${t.avv.thirdCountry}` : ''}
              </span>
              <Link
                to={`/datenschutz#avv-${t.avvId}`}
                onClick={onNavigate}
                className="text-accent hover:underline font-medium"
              >
                AVV ↗
              </Link>
              {t.avv.privacyUrl && (
                <a
                  href={t.avv.privacyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline font-medium"
                >
                  Datenschutz ↗
                </a>
              )}
            </div>
            <details className="mt-1.5 group">
              <summary className="cursor-pointer text-[11px] text-accent hover:underline font-medium list-none inline-flex items-center gap-1">
                <span className="transition-transform group-open:rotate-90" aria-hidden="true">›</span>
                DSGVO-Details
              </summary>
              <dl className="mt-1.5 space-y-1.5 text-[11px] leading-snug border-l-2 border-border pl-2.5">
                <div>
                  <dt className="font-medium text-foreground">Zwecke</dt>
                  <dd className="text-muted-foreground">{t.purposes.join(' · ')}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Datenkategorien</dt>
                  <dd className="text-muted-foreground">{t.dataCategories.join(' · ')}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Rechtsgrundlage</dt>
                  <dd className="text-muted-foreground">{t.legalBasis}</dd>
                </div>
              </dl>
            </details>
          </li>
        );
      })}
    </ul>
  );
}
