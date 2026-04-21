import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { initTrackingIfConsented, loadTrackingScripts } from '@/lib/tracking';

const COOKIE_CONSENT_KEY = 'cookie-consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
    // Bereits zugestimmt → Tracking nachladen
    initTrackingIfConsented();
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    loadTrackingScripts();
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setVisible(false);
  };

  return (
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
                <Button variant="outline" size="sm" onClick={handleDecline} className="flex-1 sm:flex-none min-h-11 px-4 text-xs">
                  Ablehnen
                </Button>
                <Button size="sm" onClick={handleAccept} className="flex-1 sm:flex-none min-h-11 px-4 text-xs">
                  Akzeptieren
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
