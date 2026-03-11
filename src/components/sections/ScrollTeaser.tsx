import { motion } from 'framer-motion';
import { siteData } from '@/data/siteData';

export function ScrollTeaser() {
  return (
    <section className="bg-background py-10 md:py-14">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-snug"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          {siteData.scrollTeaser}
        </motion.p>
        <motion.div
          className="mt-4 mx-auto w-16 h-1 bg-primary rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
      </div>
    </section>
  );
}
