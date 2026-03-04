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
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16">
            Warum Unternehmer mit mir arbeiten
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {columns.map((col, i) => (
            <ScrollReveal key={col.title} delay={i * 0.15}>
              <div className="text-center space-y-4">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto">
                  <col.icon className="size-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">{col.title}</h3>
                <p className="text-primary-foreground/75 leading-relaxed">
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
