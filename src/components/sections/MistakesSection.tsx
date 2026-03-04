import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { AlertTriangle, Users, Workflow, ShieldCheck, TrendingUp } from 'lucide-react';

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
    headline: 'Mein Unternehmen nicht abgesichert.',
    reflection: 'Ich hatte keine Kontrollsysteme, keine Datenüberwachung und keine klaren Prozesse für den Ernstfall. Als es darauf ankam, war ich unvorbereitet.',
    lesson: 'Heute sind Absicherung und Monitoring fester Bestandteil meiner Unternehmensstruktur – vieles davon KI-gestützt.',
  },
  {
    icon: TrendingUp,
    headline: 'Zu schnell wachsen.',
    reflection: 'Einer meiner größten Fehler war, Wachstum über Struktur zu stellen. Neue Projekte, neue Verantwortung, neue Menschen – aber zu wenig klare Prozesse.',
    lesson: 'Heute weiß ich: Wachstum ohne Struktur ist kein Fortschritt. Es ist Risiko. Deshalb arbeite ich heute konsequent mit klaren Systemen und KI-gestützten Prozessen.',
  },
];

export function MistakesSection() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-8 bg-[#111111] relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[#0F3D2E]/5 to-[#111111] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollReveal>
          <p className="text-[#0F3D2E] font-semibold tracking-widest uppercase text-sm mb-4">
            Ehrliche Reflexion
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Fehler, die ich heute nie wieder machen würde.
          </h2>
          <p className="text-white/60 text-lg mb-14 max-w-2xl">
            Erfahrungen, die mich als Unternehmer geprägt haben.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {mistakes.map((item, index) => {
            const Icon = item.icon;

            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="group h-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-7 md:p-8 transition-all duration-300 hover:bg-white/[0.07] hover:border-[#0F3D2E]/40"
                >
                  <div className="size-12 rounded-full bg-[#0F3D2E]/20 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-[#0F3D2E]/30">
                    <Icon className="size-5 text-[#0F3D2E]" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 leading-snug">
                    {item.headline}
                  </h3>

                  <p className="text-white/50 leading-relaxed mb-4 text-[15px]">
                    {item.reflection}
                  </p>

                  <p className="text-[#0F3D2E] font-medium leading-relaxed text-[15px]">
                    {item.lesson}
                  </p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
