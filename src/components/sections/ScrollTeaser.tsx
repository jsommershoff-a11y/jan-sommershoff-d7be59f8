import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export function ScrollTeaser() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="relative border-l-4 border-primary pl-6 md:pl-8"
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
            <Zap className="size-4 text-primary" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Zukunftssicherheit</span>
          </motion.div>
          <motion.p
            className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Unternehmen, die heute nicht automatisieren, werden morgen abgehängt.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mt-2 font-medium"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Bis zu 30 Stunden pro Woche einsparen – durch intelligente Automatisierung.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
