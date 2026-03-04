import { motion } from 'framer-motion';
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
                className="px-10 py-5 bg-primary text-primary-foreground text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-[0_4px_20px_rgba(15,61,46,0.4)] inline-block"
              >
                KI Erste Hilfe starten
              </a>
              <a
                href="https://krs-signature.de/auth?src=jan"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 border-2 border-white/40 text-white text-lg font-semibold rounded-lg hover:bg-white/10 transition-colors inline-block"
              >
                Gespräch anfragen
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
