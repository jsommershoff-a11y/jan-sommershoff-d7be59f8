import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { trackEvent } from '@/lib/tracking';

export function StickyCta() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const shownTracked = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.3;
      setIsVisible(scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible && !shownTracked.current) {
      shownTracked.current = true;
      trackEvent('cta_shown', { cta_id: 'sticky_notfallkoffer', placement: 'sticky_bottom' });
    }
  }, [isVisible]);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-t border-primary-foreground/10 px-4 py-3 md:py-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <p className="text-primary-foreground text-sm md:text-base font-medium hidden sm:block">
              Sichere dir den kostenlosen KI-Notfallkoffer.
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                to="/kontakt?ziel=notfallkoffer"
                onClick={() =>
                  trackEvent('cta_click', {
                    cta_id: 'sticky_notfallkoffer',
                    placement: 'sticky_bottom',
                    target: 'notfallkoffer',
                  })
                }
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-primary font-bold rounded-lg hover:bg-white/90 transition-all shadow-[0_2px_15px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.35)] hover:-translate-y-0.5 text-sm"
              >
                Notfallkoffer anfragen
                <ArrowRight className="size-4" />
              </Link>
              <button
                onClick={() => {
                  trackEvent('cta_dismissed', {
                    cta_id: 'sticky_notfallkoffer',
                    placement: 'sticky_bottom',
                  });
                  setIsDismissed(true);
                }}
                className="p-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                aria-label="Schließen"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
