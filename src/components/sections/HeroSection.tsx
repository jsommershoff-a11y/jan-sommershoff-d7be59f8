import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { siteData } from '@/data/siteData';
import heroImage from '@/assets/hero-jan.jpeg';

export function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Jan Sommershoff auf der Bühne"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.75] via-black/[0.60] to-black/[0.45]" />
      </div>

      <div className="relative h-full flex items-center px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            className="max-w-2xl space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.2]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block">Comeback.</span>
              <span className="block mt-2 md:mt-4">Struktur.</span>
              <span className="block mt-2 md:mt-4 text-primary">KI.</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {siteData.heroSubheadline}
            </motion.p>

            <motion.p
              className="text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-accent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {siteData.tagline}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a
                href="https://krs-signature.de/auth?src=jan"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground text-lg font-bold rounded-xl hover:opacity-90 transition-all shadow-[0_4px_30px_rgba(15,61,46,0.5)] hover:shadow-[0_8px_40px_rgba(15,61,46,0.6)] hover:-translate-y-1 duration-300"
              >
                <span className="absolute inset-0 rounded-xl bg-primary animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite] opacity-20" />
                <span className="relative">KI Erste Hilfe starten</span>
                <ArrowRight className="relative size-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://krs-signature.de/auth?src=jan"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-5 border-2 border-white/40 text-white text-lg font-semibold rounded-xl hover:bg-white/10 hover:border-white/60 transition-all duration-300"
              >
                Gespräch anfragen
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
