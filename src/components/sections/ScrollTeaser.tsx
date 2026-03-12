import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export function ScrollTeaser() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="relative border-l-4 border-accent pl-6 md:pl-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="flex items-center gap-2 mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <AlertTriangle className="size-4 text-accent" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">Ehrliche Worte</span>
          </motion.div>
          <motion.p
            className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ich hatte 7-stellige Schulden.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mt-2 font-medium"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            6-stellig davon sind bereits Geschichte. Der Rest folgt.
          </motion.p>
          <motion.p
            className="text-sm md:text-base text-foreground/60 mt-4 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            "Die meisten reden über Erfolg. Ich rede über das, was davor kommt."
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
