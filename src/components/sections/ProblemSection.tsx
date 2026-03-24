import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { AlertTriangle, UserX, Clock, Quote } from 'lucide-react';
import visualProblem from '@/assets/visual-problem.jpg';

const problems = [
  {
    icon: AlertTriangle,
    title: 'Chaos im Vertrieb',
    text: 'Anfragen gehen in WhatsApp und Mails unter. Kein System, kein Überblick, kein Wachstum.',
  },
  {
    icon: UserX,
    title: 'Abhängigkeit von dir',
    text: 'Ohne dich als Geschäftsführer steht alles still. Urlaub? Unmöglich.',
  },
  {
    icon: Clock,
    title: 'Manuelle Ineffizienz',
    text: 'Dein Team verbringt Stunden mit Buchhaltung, Follow-ups und Aufgaben, die automatisiert gehören.',
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 md:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">
              Das Problem
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Jeder Tag ohne System kostet dich
              <br className="hidden md:block" />
              <span className="text-accent"> Geld, Kunden und Wachstum.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {problems.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <p.icon className="size-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="flex items-start gap-4 max-w-2xl mx-auto bg-muted rounded-2xl p-6 md:p-8">
            <Quote className="size-6 text-accent shrink-0 mt-1" />
            <p className="text-lg md:text-xl font-semibold text-foreground leading-relaxed">
              Du bist nicht gestartet, um der beste Mitarbeiter in deinem eigenen Unternehmen zu sein.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
