import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Briefcase, Target, Cpu } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const columns = [
  {
    icon: Briefcase,
    title: 'Unternehmer-Erfahrung',
    text: 'Ich habe selbst Unternehmen aufgebaut, geführt und erfolgreich skaliert. Ich kenne die Realität unternehmerischer Verantwortung.',
  },
  {
    icon: Target,
    title: 'Praxis statt Theorie',
    text: 'Meine Arbeit basiert nicht auf Konzepten aus Büchern, sondern auf realen unternehmerischen Entscheidungen.',
  },
  {
    icon: Cpu,
    title: 'KI als Werkzeug',
    text: 'KI ersetzt keine Unternehmer. Aber richtig eingesetzt wird sie zu einem System, das Klarheit, Geschwindigkeit und Struktur schafft.',
  },
];

function FloatingIcon({ icon: Icon, index }: { icon: React.ElementType; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3 + index * 2, 3 - index * 2]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate }}
      className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto"
    >
      <Icon className="size-6 md:size-7 text-accent" />
    </motion.div>
  );
}

export function TrustSection() {
  return (
    <section className="relative py-16 md:py-32 px-5 md:px-6 lg:px-8 bg-primary text-primary-foreground">
      {/* Transition handled by SectionTransition in Home.tsx */}
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center mb-10 md:mb-16">
            Warum Unternehmer mit mir arbeiten
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {columns.map((col, i) => (
            <ScrollReveal key={col.title} delay={i * 0.1}>
              <div className="text-center space-y-3 md:space-y-4">
                <FloatingIcon icon={col.icon} index={i} />
                <h3 className="text-lg md:text-xl font-semibold">{col.title}</h3>
                <p className="text-primary-foreground/75 leading-relaxed text-sm md:text-base">
                  {col.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}