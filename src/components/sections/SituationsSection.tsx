import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ChevronDown, TrendingDown, Users, Scale, BrainCog, Landmark } from 'lucide-react';

const situations = [
  {
    icon: TrendingDown,
    headline: 'Dein Umsatz bricht ein – und du weißt nicht warum.',
    story: 'Du arbeitest mehr als je zuvor. Aber die Zahlen stimmen nicht mehr. Kunden springen ab, Projekte verzögern sich, und du merkst: Irgendwo ist das System undicht geworden.',
    insight: 'Meistens liegt es nicht am Markt. Sondern an fehlenden Strukturen, die mit dem Wachstum nicht mitgewachsen sind.',
  },
  {
    icon: Users,
    headline: 'Du hast ein Team – aber trägst alles allein.',
    story: 'Auf dem Papier hast du Mitarbeiter. Aber in der Realität landest du bei jeder wichtigen Entscheidung wieder bei dir selbst. Delegation fühlt sich an wie ein Risiko.',
    insight: 'Echte Führung beginnt mit klaren Entscheidungsstrukturen – nicht mit mehr Kontrolle.',
  },
  {
    icon: Scale,
    headline: 'Du stehst vor einer Entscheidung, die alles verändern könnte.',
    story: 'Verkaufen oder weitermachen? Investieren oder absichern? Partner aufnehmen oder allein weitergehen? Die Tragweite der Entscheidung lähmt dich.',
    insight: 'In solchen Momenten hilft kein Bauchgefühl. Sondern ein strukturiertes Framework, das deine Optionen klar macht.',
  },
  {
    icon: BrainCog,
    headline: 'Du weißt, dass KI wichtig wird – aber nicht, wo du anfangen sollst.',
    story: 'Alle reden über künstliche Intelligenz. Du siehst die Möglichkeiten, aber dein Tagesgeschäft lässt keinen Raum zum Experimentieren. Du hast Angst, den Anschluss zu verlieren.',
    insight: 'Du brauchst keine KI-Revolution. Du brauchst drei bis fünf konkrete Anwendungen, die sofort Wirkung zeigen.',
  },
  {
    icon: Landmark,
    headline: 'Dein Unternehmen hat eine Krise hinter sich – und du brauchst einen Neustart.',
    story: 'Vielleicht war es ein finanzieller Rückschlag, ein gescheitertes Projekt oder eine persönliche Krise. Du stehst wieder auf – aber der Weg zurück fühlt sich unklar an.',
    insight: 'Ein Comeback beginnt nicht mit Motivation. Sondern mit einem soliden Fundament aus Struktur, Systemen und den richtigen Entscheidungen.',
  },
];

export function SituationsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-28 px-6 lg:px-8 bg-[#F3F4F3]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F3D2E] mb-4 leading-tight">
            Vielleicht kennst du diese Situationen.
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
            Unternehmertum bringt Phasen mit, in denen Erfahrung und Struktur den Unterschied machen.
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          {situations.map((item, index) => {
            const isOpen = openIndex === index;
            const Icon = item.icon;

            return (
              <ScrollReveal key={index} delay={index * 0.08}>
                <div
                  className={`bg-white rounded-xl shadow-sm transition-shadow duration-300 ${
                    isOpen ? 'shadow-md' : 'hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center gap-4 p-5 md:p-6 text-left"
                  >
                    <div className="shrink-0 size-11 rounded-lg bg-[#0F3D2E]/10 flex items-center justify-center">
                      <Icon className="size-5 text-[#0F3D2E]" />
                    </div>
                    <span className="flex-1 text-base md:text-lg font-semibold text-foreground leading-snug">
                      {item.headline}
                    </span>
                    <ChevronDown
                      className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-6 pt-0 ml-0 md:ml-[3.75rem] space-y-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {item.story}
                          </p>
                          <p className="text-[#0F3D2E] font-medium leading-relaxed">
                            {item.insight}
                          </p>
                          <button
                            onClick={scrollToContact}
                            className="text-sm font-semibold text-[#0F3D2E] hover:underline underline-offset-4 transition-all"
                          >
                            Darüber können wir sprechen →
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
