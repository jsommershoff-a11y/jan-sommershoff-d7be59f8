import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { siteData } from '@/data/siteData';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import heroImage from '@/assets/hero-jan.jpeg';

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Jan Sommershoff auf der Bühne"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.92] via-black/[0.80] to-black/[0.65]" />
        {/* Dramatic red accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: 'easeOut' }}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      <div className="relative h-full flex items-center px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            className="max-w-3xl space-y-4 md:space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Provocative pre-headline */}
            <motion.p
              className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-accent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              7-stellige Schulden. 2 Kinder. Kein Plan B.
            </motion.p>

            <motion.h1
              className="text-[2.5rem] md:text-7xl lg:text-[5.5rem] font-black tracking-tight text-white leading-[1.05]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block">Gefallen.</span>
              <span className="block mt-1 md:mt-3">Wieder aufgebaut.</span>
              <motion.span
                className="block mt-1 md:mt-3 text-primary"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7, type: 'spring', stiffness: 200 }}
              >
                Mit System.
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/90 font-normal leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ich baue mein Unternehmen wieder auf — mit den richtigen Systemen, Struktur und KI.
              <span className="block mt-1 text-white/60 text-base">Und zeige anderen Unternehmern, wie sie es auch schaffen.</span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a
                href="https://krs-signature.de/auth?src=jan"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-primary-foreground text-lg font-bold rounded-xl hover:opacity-90 transition-all shadow-[0_4px_30px_rgba(15,61,46,0.5)] hover:shadow-[0_8px_40px_rgba(15,61,46,0.6)] hover:-translate-y-1 duration-300"
              >
                <span className="absolute inset-0 rounded-xl bg-primary animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite] opacity-20" />
                <span className="relative">KI Erste Hilfe starten</span>
                <ArrowRight className="relative size-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://krs-signature.de/auth?src=jan"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/40 text-white text-lg font-semibold rounded-xl hover:bg-white/10 hover:border-white/60 transition-all duration-300"
              >
                Gespräch anfragen
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
