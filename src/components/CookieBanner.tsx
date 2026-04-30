import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Settings, Cookie } from 'lucide-react';
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

  const persist = (state: ConsentState) => {
    writeConsent(state);
    setSavedConsent(state);
  };

  const handleAcceptAll = () => {
    persist({ analytics: true, marketing: true });
    setVisible(false);
    setSettingsOpen(false);
  };

  const handleDeclineAll = () => {
    persist({ analytics: false, marketing: false });
    setVisible(false);
    setSettingsOpen(false);
  };

  const handleSaveSelection = () => {
    persist(draft);
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

          <div className="space-y-3 py-2">
            {/* Notwendig */}
            <div className="rounded-lg border border-border p-3 bg-muted/40">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-foreground">Notwendig</p>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                  Immer aktiv
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Erforderlich für den Betrieb der Website.
              </p>
            </div>

            {/* Analyse (GA4) */}
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
                Google Analytics 4 — anonymisierte Reichweitenmessung &
                Seitenaufrufe.
              </p>
            </div>

            {/* Marketing (Meta Pixel + Apollo.io) */}
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
                Lädt erst nach aktiver Zustimmung — Widerruf jederzeit über diesen Dialog möglich.
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block w-1 h-1 rounded-full bg-accent shrink-0" />
                  <span>
                    <span className="font-medium text-foreground">Meta Pixel</span> — Conversion-Tracking
                    &amp; Kampagnenmessung (Meta Platforms Ireland Ltd.).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block w-1 h-1 rounded-full bg-accent shrink-0" />
                  <span>
                    <span className="font-medium text-foreground">Apollo.io</span> — B2B-Besucher-Identifikation
                    via Reverse-IP-Lookup (Apollo.io Inc., USA — EU-US DPF + SCC).
                  </span>
                </li>
              </ul>
              <p className="mt-2 text-xs text-muted-foreground">
                Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO.{' '}
                <Link
                  to="/datenschutz#avv"
                  onClick={() => setSettingsOpen(false)}
                  className="text-accent hover:underline font-medium"
                >
                  AVV-Register ansehen
                </Link>
              </p>
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
