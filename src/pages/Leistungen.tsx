import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { motion } from 'framer-motion';
import { Users, Brain, Mic, ArrowRight, CheckCircle2 } from 'lucide-react';

const services = [
  {
    icon: Users,
    title: '1:1 Unternehmer-Beratung',
    subtitle: 'Klarheit in schwierigen Phasen',
    description:
      'Persönliche Beratung für Unternehmer, die in einer Krise stecken oder ihr Unternehmen auf ein neues Level bringen wollen. Ich begleite dich mit Struktur, Erfahrung und klaren Entscheidungen.',
    features: [
      'Analyse deiner aktuellen Situation',
      'Entwicklung einer klaren Strategie',
      'Aufbau stabiler Entscheidungsstrukturen',
      'Persönliche Begleitung über mehrere Wochen',
    ],
    highlight: 'Für Unternehmer, die nicht nur reden, sondern handeln wollen.',
  },
  {
    icon: Brain,
    title: 'KI-Integration für Unternehmen',
    subtitle: 'Systeme, die für dich arbeiten',
    description:
      'Ich unterstütze dich dabei, künstliche Intelligenz gezielt in deine Unternehmensprozesse zu integrieren – für bessere Entscheidungen, effizientere Abläufe und ein skalierbares Fundament.',
    features: [
      'Identifikation der größten KI-Hebel in deinem Unternehmen',
      'Aufbau automatisierter Workflows',
      'Integration von KI in bestehende Systeme',
      'Schulung deines Teams im Umgang mit KI-Tools',
    ],
    highlight: 'Wer heute KI integriert, baut einen massiven Vorteil auf.',
  },
  {
    icon: Mic,
    title: 'Workshops & Vorträge',
    subtitle: 'Impulse, die bewegen',
    description:
      'Keynotes und Workshops zu Unternehmertum, Comeback-Strategien und KI-Integration. Authentisch, praxisnah und aus echten Erfahrungen – nicht aus dem Lehrbuch.',
    features: [
      'Keynotes für Events und Konferenzen',
      'Workshops für Unternehmergruppen',
      'Firmeninterne Trainings zu KI & Struktur',
      'Individuelle Formate nach Absprache',
    ],
    highlight: 'Echte Geschichten. Echte Strategien. Kein Motivations-Blabla.',
  },
];

export default function Leistungen() {
  return (
    <>
      <SEOHead
        title="Leistungen – Beratung, KI-Integration & Workshops"
        description="1:1 Unternehmer-Beratung, KI-Integration für Unternehmen und Workshops & Vorträge. Aus echter Erfahrung – für Unternehmer, die handeln wollen."
      />

      {/* Hero */}
      <section className="relative py-28 md:py-36 px-6 lg:px-8 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-widest uppercase text-primary-foreground/60 mb-4">
              Leistungen
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground mb-6">
              Struktur. Klarheit. Systeme.
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Ich arbeite mit Unternehmern, die mehr wollen als Theorie – und bereit sind, echte Veränderungen umzusetzen.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32 px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto space-y-20 md:space-y-28">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 1;

            return (
              <ScrollReveal key={service.title} delay={0.1}>
                <div
                  className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-16 items-start`}
                >
                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="size-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                      {service.title}
                    </h2>

                    <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                      {service.description}
                    </p>

                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="size-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-foreground/90 text-sm md:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-sm font-medium text-accent italic">
                      {service.highlight}
                    </p>
                  </div>

                  {/* Visual card */}
                  <div className="flex-1 w-full">
                    <div className="bg-muted rounded-2xl p-8 md:p-10 border border-border h-full flex flex-col justify-center">
                      <Icon className="size-16 text-primary/20 mb-6" />
                      <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {service.description.slice(0, 120)}…
                      </p>
                      <a
                        href="https://krs-signature.de/auth?src=jan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                      >
                        Gespräch starten <ArrowRight className="size-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 lg:px-8 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground mb-6">
              Bereit für den nächsten Schritt?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed">
              Lass uns in einem persönlichen Gespräch herausfinden, wie ich dich unterstützen kann.
            </p>
            <motion.a
              href="https://krs-signature.de/auth?src=jan"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-bold text-base tracking-wide hover:bg-white/90 transition-colors shadow-xl"
            >
              Gespräch anfragen
              <ArrowRight className="size-5" />
            </motion.a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
