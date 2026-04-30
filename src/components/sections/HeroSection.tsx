import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import heroImage from '@/assets/hero-jan.jpeg';

export function HeroSection() {

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Jan Sommershoff – KI & Automatisierung"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.92] via-black/[0.80] to-black/[0.65]" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: 'easeOut' }}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      <div className="relative h-full flex items-center px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            className="max-w-3xl space-y-4 md:space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.p
              className="text-xs md:text-base font-bold tracking-[0.25em] md:tracking-[0.3em] uppercase text-accent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              KI für Unternehmer
            </motion.p>

            <motion.h1
              className="text-[2.2rem] md:text-6xl lg:text-[5rem] font-black tracking-tight text-white leading-[1.08]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block">Mach dein Unternehmen</span>
              <motion.span
                className="block mt-1 md:mt-2 text-primary"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7, type: 'spring', stiffness: 200 }}
              >
                KI-fit. Bevor es zu spät ist.
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-base md:text-xl text-white/90 font-normal leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Automatisierungen sparen deinem Team bis zu 30 Stunden pro Woche. Wir sichern deine Daten und machen dein Unternehmen zukunftsfähig.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-1 md:pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/kontakt?ziel=potenzialanalyse"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-accent text-white text-base md:text-lg font-bold rounded-xl hover:opacity-90 transition-all shadow-[0_4px_30px_rgba(246,113,31,0.4)] hover:shadow-[0_8px_40px_rgba(246,113,31,0.5)] hover:-translate-y-1 duration-300"
              >
                <span className="absolute inset-0 rounded-xl bg-accent animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite] opacity-20" />
                <span className="relative">Potenzialanalyse anfragen</span>
                <ArrowRight className="relative size-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Trust elements */}
            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <span>150+ automatisierte Prozesse</span>
              <span className="hidden sm:inline">|</span>
              <span>Bis zu 30 Std. Zeitersparnis/Woche</span>
              <span className="hidden sm:inline">|</span>
              <span>Datensicherheit & Zukunftsfähigkeit</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
