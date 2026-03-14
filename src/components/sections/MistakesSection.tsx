import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { AlertTriangle, Users, Workflow, ShieldCheck, TrendingUp, ArrowRightLeft, Compass } from 'lucide-react';

const mistakes = [
  {
    icon: AlertTriangle,
    headline: 'Entscheidungen unter Druck getroffen.',
    reflection: 'Ich habe Verträge unterschrieben, Deals zugesagt und Investitionen getätigt – weil andere Druck gemacht haben. Nicht weil ich überzeugt war.',
    lesson: 'Heute entscheide ich nie unter Zeitdruck. Jede wichtige Entscheidung bekommt mindestens 48 Stunden Abstand.',
  },
  {
    icon: Users,
    headline: 'Den falschen Menschen vertraut.',
    reflection: 'Ich habe Menschen Verantwortung gegeben, die sie nicht verdient hatten. Nicht aus Naivität – sondern weil ich Warnsignale ignoriert habe.',
    lesson: 'Vertrauen entsteht durch Handlungen, nicht durch Worte. Heute prüfe ich Ergebnisse, bevor ich Verantwortung übertrage.',
  },
  {
    icon: Workflow,
    headline: 'Wachstum vor Struktur gesetzt.',
    reflection: 'Ich wollte schnell wachsen. Mehr Projekte, mehr Mitarbeiter, mehr Umsatz. Aber ohne Systeme wurde jedes Wachstum zum Risiko.',
    lesson: 'Struktur ist kein Bremsklotz. Struktur ist das Fundament, das Wachstum erst möglich macht.',
  },
  {
    icon: ShieldCheck,
    headline: 'Mein Unternehmen nicht ausreichend schützen.',
    reflection: 'In schwierigen Zeiten habe ich erlebt, wie schnell Vertrauen missbraucht werden kann. Fehlende Kontrollmechanismen, unklare Datenstrukturen und zu viel Vertrauen haben zu Problemen geführt.',
    lesson: 'Heute setze ich auf klare Systeme, Monitoring und strukturierte Prozesse – oft auch mit KI-Unterstützung.',
  },
  {
    icon: TrendingUp,
    headline: 'Zu schnell wachsen.',
    reflection: 'Einer meiner größten Fehler war, Wachstum über Struktur zu stellen. Neue Projekte, neue Verantwortung, neue Menschen – aber zu wenig klare Prozesse.',
    lesson: 'Heute weiß ich: Wachstum ohne Struktur ist kein Fortschritt. Es ist Risiko. Deshalb arbeite ich heute konsequent mit klaren Systemen und KI-gestützten Prozessen.',
  },
  {
    icon: ArrowRightLeft,
    headline: 'Verantwortung zu früh abgeben.',
    reflection: 'Ich habe Aufgaben delegiert, bevor die Prozesse wirklich klar waren. Mitarbeiter konnten Entscheidungen nicht sauber treffen, weil die Struktur fehlte.',
    lesson: 'Die Verantwortung lag am Ende trotzdem bei mir. Heute gilt für mich: Erst verstehen. Dann strukturieren. Dann delegieren.',
  },
  {
    icon: Compass,
    headline: 'Entscheidungen alleine tragen.',
    reflection: 'Je größer ein Unternehmen wird, desto weniger Menschen gibt es, mit denen man offen sprechen kann. Viele Gespräche verfolgen eigene Interessen.',
    lesson: 'Heute nutze ich strukturierte Entscheidungsprozesse und manchmal auch KI, um Entscheidungen aus mehreren Perspektiven zu betrachten.',
  },
];

export function MistakesSection() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-8 bg-[#111111] relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-primary/5 to-[#111111] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollReveal>
          <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-4">
            Ehrliche Reflexion
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Fehler, die ich heute nie wieder machen würde.
          </h2>
          <div className="w-16 h-0.5 bg-primary mb-6" />
          <p className="text-white/60 text-lg mb-16 max-w-2xl">
            Erfahrungen, die mich als Unternehmer geprägt haben.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {mistakes.map((item, index) => {
            const Icon = item.icon;

            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="group relative h-full bg-[#1a1a1a] border border-white/[0.06] rounded-2xl p-7 md:p-8 transition-all duration-300 hover:border-primary/40 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                  {/* Large decorative quote mark */}
                  <span className="absolute top-4 right-5 text-[7rem] leading-none font-serif text-white/[0.03] pointer-events-none select-none">
                    „
                  </span>

                  <div className="relative z-10">
                    <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-primary/30">
                      <Icon className="size-5 text-primary" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 leading-snug">
                      {item.headline}
                    </h3>

                    <p className="text-white/50 leading-relaxed mb-4 text-[15px]">
                      {item.reflection}
                    </p>

                    <p className="text-accent font-medium leading-relaxed text-[15px]">
                      {item.lesson}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
