import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Gift } from 'lucide-react';

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const trigger = useCallback(() => {
    if (hasTriggered) return;
    // Don't show if dismissed before (session)
    if (sessionStorage.getItem('exit-popup-dismissed')) return;
    setIsOpen(true);
    setHasTriggered(true);
  }, [hasTriggered]);

  const dismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem('exit-popup-dismissed', 'true');
  };

  useEffect(() => {
    // Desktop: mouse leaves viewport top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };

    // Mobile: inactivity timeout (30s, only when no overlay is open)
    let inactivityTimer: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        // Don't trigger if a mobile menu or modal overlay is visible
        const mobileMenuOpen = document.querySelector('[aria-label="Menü schließen"]');
        if (!mobileMenuOpen) trigger();
      }, 30000);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', resetTimer, { passive: true });
    window.addEventListener('touchstart', resetTimer, { passive: true });
    resetTimer();

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      clearTimeout(inactivityTimer);
    };
  }, [trigger]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} />

          {/* Modal */}
          <motion.div
            className="relative bg-background border border-border rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Schließen"
            >
              <X className="size-5" />
            </button>

            <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <Gift className="size-7 text-primary" />
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-3">
              Warte — hol dir den KI-Notfallkoffer
            </h3>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              10 KI-Prompts, 3 Automatisierungs-Workflows und ein Entscheidungs-Framework — kostenlos für Unternehmer.
            </p>

            <Link
              to="/auth"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all text-base"
              onClick={dismiss}
            >
              Kostenlos sichern
              <ArrowRight className="size-5" />
            </Link>

            <p className="mt-4 text-xs text-muted-foreground">
              Kein Spam. Sofortiger Zugang.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
