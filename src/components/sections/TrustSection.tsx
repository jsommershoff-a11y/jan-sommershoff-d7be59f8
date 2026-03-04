import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Briefcase, Target, Cpu } from 'lucide-react';

const columns = [
  {
    icon: Briefcase,
    title: 'Unternehmer-Erfahrung',
    text: 'Ich habe selbst Unternehmen aufgebaut, geführt und durch Krisen navigiert. Ich kenne die Realität unternehmerischer Verantwortung.',
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

export function TrustSection() {
  return (
    <section className="relative py-16 md:py-32 px-5 md:px-6 lg:px-8 bg-primary text-primary-foreground">
      {/* Subtle gradient transition from hero */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
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
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto">
                  <col.icon className="size-6 md:size-7 text-accent" />
                </div>
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