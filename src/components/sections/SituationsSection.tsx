import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ChevronDown, TrendingDown, Users, Scale, BrainCog, Landmark } from 'lucide-react';

const situations = [
  {
    icon: Scale,
    headline: 'Du wirst im Business zu Entscheidungen gedrängt.',
    story: 'Manchmal wirst du im Business unter Druck gesetzt.\n\nGeschäftspartner, Investoren oder sogar Freunde erwarten, dass du sofort entscheidest. Jetzt unterschreiben. Jetzt investieren. Jetzt den nächsten Schritt machen.\n\nDu spürst innerlich, dass etwas nicht stimmt – aber der Druck von außen ist groß.\n\nGenau in solchen Situationen habe ich in der Vergangenheit falsche Entscheidungen getroffen.',
    insight: 'Heute weiß ich: Die wichtigsten Entscheidungen trifft man nicht unter Druck. Sondern mit Struktur, Analyse und der Fähigkeit, einen Schritt zurückzugehen.',
  },
  {
    icon: BrainCog,
    headline: 'Du arbeitest im Unternehmen statt am Unternehmen.',
    story: 'Viele Unternehmer verlieren sich irgendwann im operativen Chaos.\n\nBelege prüfen. E-Mails beantworten. Dokumente sortieren. Prozesse kontrollieren.\n\nDu arbeitest mehr im Unternehmen als am Unternehmen.\n\nDie Realität ist brutal: Unternehmer, die dauerhaft wie eine Sekretärin arbeiten, werden langfristig auch wie eine Sekretärin bezahlt.',
    insight: 'Genau hier verändert künstliche Intelligenz gerade alles. Viele dieser Aufgaben lassen sich heute von KI-Systemen erledigen – sauber, strukturiert und kontrollierbar.',
  },
  {
    icon: TrendingDown,
    headline: 'Du merkst, dass dein Unternehmen schneller wächst als deine Strukturen.',
    story: 'Am Anfang funktioniert vieles über Energie und Improvisation.\n\nDoch irgendwann merkst du: Entscheidungen dauern länger, Prozesse funktionieren nicht sauber und dein Unternehmen wird immer chaotischer.\n\nViele Unternehmer versuchen dann einfach noch mehr zu arbeiten.',
    insight: 'Das Problem ist aber selten der Einsatz. Das Problem sind fehlende Systeme.',
  },
  {
    icon: Users,
    headline: 'Du hast Erfolg – aber innerlich fühlt sich vieles falsch an.',
    story: 'Von außen sieht alles gut aus.\n\nDas Unternehmen wächst, Projekte laufen, Menschen sehen dich als erfolgreichen Unternehmer.\n\nAber innerlich merkst du, dass vieles nicht mehr stimmig ist. Entscheidungen fühlen sich schwer an und du hast das Gefühl, ständig unter Druck zu stehen.',
    insight: 'Diese Phase kennen viele Unternehmer – aber kaum jemand spricht offen darüber.',
  },
  {
    icon: Landmark,
    headline: 'Du trägst Entscheidungen alleine.',
    story: 'Je größer dein Unternehmen wird, desto weniger Menschen gibt es, mit denen du offen über Entscheidungen sprechen kannst.\n\nMitarbeiter erwarten Führung. Partner erwarten Ergebnisse. Familie erwartet Stabilität.\n\nAber wer hört dir zu, wenn du selbst nicht mehr weiterweißt?',
    insight: 'Manchmal braucht es keinen Berater. Sondern jemanden, der diese Situationen selbst erlebt hat.',
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
                  className={`bg-white rounded-xl border-2 transition-all duration-300 ${
                    isOpen
                      ? 'shadow-md border-[#0F3D2E]'
                      : 'shadow-sm border-transparent hover:shadow-md hover:border-[#0F3D2E]/30'
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
                          <div className="text-muted-foreground leading-relaxed space-y-3">
                            {item.story.split('\n\n').map((p, i) => (
                              <p key={i}>{p}</p>
                            ))}
                          </div>
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
