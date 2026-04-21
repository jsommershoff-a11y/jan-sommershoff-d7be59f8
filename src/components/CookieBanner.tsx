import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Settings, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { initTrackingIfConsented, loadTrackingScripts } from '@/lib/tracking';

const COOKIE_CONSENT_KEY = 'cookie-consent';
const CONSENT_CHANGED_EVENT = 'cookie-consent-changed';

type Consent = 'accepted' | 'declined' | null;

function readConsent(): Consent {
  try {
    const v = localStorage.getItem(COOKIE_CONSENT_KEY);
    return v === 'accepted' || v === 'declined' ? v : null;
  } catch {
    return null;
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [consent, setConsent] = useState<Consent>(null);

  useEffect(() => {
    const current = readConsent();
    setConsent(current);
    if (!current) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
    initTrackingIfConsented();
  }, []);

  // Listen für externe Trigger ("Cookie-Einstellungen"-Link, z.B. im Footer)
  useEffect(() => {
    const open = () => setSettingsOpen(true);
    window.addEventListener('open-cookie-settings', open);
    return () => window.removeEventListener('open-cookie-settings', open);
  }, []);

  const persist = (value: 'accepted' | 'declined') => {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
    setConsent(value);
    if (value === 'accepted') loadTrackingScripts();
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: value }));
  };

  const handleAccept = () => {
    persist('accepted');
    setVisible(false);
    setSettingsOpen(false);
  };

  const handleDecline = () => {
    persist('declined');
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
                    onClick={handleDecline}
                    className="flex-1 sm:flex-none min-h-11 px-4 text-xs"
                  >
                    Ablehnen
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAccept}
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
              Du kannst deine Zustimmung zu Tracking-Cookies (Google Analytics &
              Meta Pixel) jederzeit ändern oder widerrufen.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div className="rounded-lg border border-border p-3 bg-muted/40">
              <p className="text-sm font-semibold text-foreground">Notwendig</p>
              <p className="text-xs text-muted-foreground mt-1">
                Immer aktiv. Erforderlich für den Betrieb der Website.
              </p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">
                  Marketing & Analyse
                </p>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    consent === 'accepted'
                      ? 'bg-primary/15 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {consent === 'accepted' ? 'Aktiv' : 'Inaktiv'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Google Analytics 4 & Meta Pixel zur Reichweiten- und
                Kampagnenmessung.
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
            <Button variant="outline" onClick={handleDecline} className="min-h-11">
              Alle ablehnen
            </Button>
            <Button onClick={handleAccept} className="min-h-11">
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
