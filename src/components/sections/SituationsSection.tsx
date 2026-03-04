import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ChevronDown, TrendingUp, Workflow, Users, LayoutList, ShieldAlert, Compass } from 'lucide-react';

const situations = [
  {
    icon: TrendingUp,
    headline: 'Du wächst schneller als deine Strukturen.',
    story: 'Manchmal wächst ein Unternehmen schneller, als man selbst Strukturen aufbauen kann.\n\nGenau das ist mir passiert.\n\nIch habe Entscheidungen getroffen, Aufgaben abgegeben und Verantwortung verteilt – ohne die Prozesse wirklich sauber aufgebaut zu haben.\n\nDas Ergebnis war Chaos, Missverständnisse und viele Probleme, die vermeidbar gewesen wären.',
    insight: 'Heute weiß ich: Wachstum ohne Struktur ist kein Wachstum. Es ist nur beschleunigtes Chaos. Saubere Prozesse, klare Verantwortlichkeiten und KI-gestützte Systeme sorgen dafür, dass Wachstum stabil bleibt.',
  },
  {
    icon: Workflow,
    headline: 'Du gibst Aufgaben ab, die du selbst noch nicht vollständig verstanden hast.',
    story: 'Ein Fehler, den viele Unternehmer machen: Dinge zu früh abgeben.\n\nIch habe Aufgaben delegiert, die ich selbst noch nicht zu 100 % durchdrungen hatte.\n\nDadurch konnten Mitarbeiter sie nicht sauber umsetzen.\n\nDie Verantwortung lag letztendlich bei mir.',
    insight: 'Heute arbeite ich anders: Prozesse werden zuerst verstanden, strukturiert und dokumentiert. Erst danach werden sie delegiert – oder durch KI automatisiert.',
  },
  {
    icon: Users,
    headline: 'Mitarbeiter werden mit Aufgaben alleine gelassen.',
    story: 'Ich habe lange geglaubt, dass gute Mitarbeiter alles alleine lösen können.\n\nAber die Wahrheit ist: Ohne klare Briefings, saubere Prozesse und regelmäßiges Feedback bleiben selbst die besten Leute unter ihrem Potenzial.\n\nDas Ergebnis waren Frustration auf beiden Seiten und Ergebnisse, die nicht meinen Erwartungen entsprachen.',
    insight: 'Führung bedeutet nicht, Aufgaben zu verteilen. Führung bedeutet, die Voraussetzungen zu schaffen, damit Menschen ihre Arbeit gut machen können.',
  },
  {
    icon: LayoutList,
    headline: 'Deine Organisation entscheidet über deinen Erfolg.',
    story: 'Unternehmer glauben oft, Erfolg entsteht durch Energie und Einsatz.\n\nDoch langfristig entscheidet etwas anderes: Selbstführung.\n\nIch habe im Verlauf meiner unternehmerischen Reise gelernt, wie entscheidend Tagesorganisation und strukturiertes Arbeiten sind.\n\nWer seine eigenen Abläufe nicht kontrolliert, verliert irgendwann die Kontrolle über sein Unternehmen.',
    insight: 'KI kann hier eine enorme Hilfe sein – bei Planung, Struktur und Kontrolle.',
  },
  {
    icon: ShieldAlert,
    headline: 'Du schützt dein Unternehmen nicht ausreichend.',
    story: 'Einer meiner größten Fehler war, mein Unternehmen nicht ausreichend abzusichern.\n\nIn schwierigen Zeiten können Menschen Entscheidungen treffen, die für dich und dein Unternehmen schädlich sind.\n\nOhne klare Kontrollprozesse, Datenüberwachung und Struktur entsteht ein Risiko, das viele Unternehmer unterschätzen.',
    insight: 'Heute lassen sich viele dieser Prozesse technisch absichern – auch mit KI. Zum Beispiel durch Monitoring von Datenbewegungen oder automatisierte Kontrollsysteme.',
  },
  {
    icon: Compass,
    headline: 'Du triffst Entscheidungen allein.',
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
