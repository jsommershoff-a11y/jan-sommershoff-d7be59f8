import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ChevronDown, TrendingUp, Workflow, Users, LayoutList, ShieldAlert, Compass } from 'lucide-react';

// Key phrases to highlight in brand color
const highlights = [
  'Strukturen', 'Chaos', 'KI-gestützt', 'beschleunigtes Chaos',
  'zu früh abgeben', 'KI automatisiert', 'strukturiert und dokumentiert',
  'Struktur', 'Systeme', 'KI', 'Selbstführung', 'Kontrolle',
  'Kontrollprozesse', 'Datenüberwachung', 'automatisierte Kontrollsysteme',
  'neutrale Perspektive', 'Risiken abzuwägen',
];

function highlightText(text: string) {
  // Sort by length descending to match longer phrases first
  const sorted = [...highlights].sort((a, b) => b.length - a.length);
  const pattern = sorted.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${pattern})`, 'g');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    sorted.some(h => h === part)
      ? <span key={i} className="text-[#0F3D2E] font-semibold">{part}</span>
      : part
  );
}

const situations = [
  {
    icon: TrendingUp,
    headline: 'Du wächst schneller als deine Strukturen.',
    story: 'Manchmal wächst ein Unternehmen schneller, als man selbst Strukturen aufbauen kann.\n\nGenau das ist mir passiert.\n\nIch habe Entscheidungen getroffen, Aufgaben abgegeben und Verantwortung verteilt – ohne die Prozesse wirklich sauber aufgebaut zu haben.\n\nDas Ergebnis war Chaos, Missverständnisse und viele Probleme, die vermeidbar gewesen wären.',
    insight: 'Heute weiß ich: Wachstum ohne Struktur ist kein Wachstum. Es ist nur beschleunigtes Chaos. Saubere Prozesse und klare Systeme – oft auch KI-gestützt – sorgen dafür, dass Wachstum stabil bleibt.',
  },
  {
    icon: Workflow,
    headline: 'Du gibst Aufgaben ab, die du selbst noch nicht vollständig verstanden hast.',
    story: 'Ein Fehler, den viele Unternehmer machen: Dinge zu früh abgeben.\n\nIch habe Aufgaben delegiert, die ich selbst noch nicht vollständig durchdrungen hatte.\n\nDadurch konnten Mitarbeiter sie nicht sauber umsetzen.\n\nDie Verantwortung lag letztendlich trotzdem bei mir.',
    insight: 'Heute arbeite ich anders: Prozesse werden zuerst verstanden, strukturiert und dokumentiert. Erst danach werden sie delegiert – oder durch KI automatisiert.',
  },
  {
    icon: Users,
    headline: 'Mitarbeiter werden mit Aufgaben alleine gelassen.',
    story: 'Viele Unternehmer erwarten Ergebnisse, ohne die nötige Struktur zu liefern.\n\nAuch ich habe diesen Fehler gemacht.\n\nMitarbeiter bekommen Aufgaben – aber keine klare Einarbeitung, keine Prozesse und keine Kontrolle.\n\nDas Ergebnis ist Frust auf beiden Seiten.',
    insight: 'Heute weiß ich: Menschen brauchen Systeme. Und KI kann helfen, Prozesse zu dokumentieren, Aufgaben zu kontrollieren und Qualität dauerhaft zu sichern.',
  },
  {
    icon: LayoutList,
    headline: 'Deine Organisation entscheidet über deinen Erfolg.',
    story: 'Unternehmer glauben oft, Erfolg entsteht durch Energie und Einsatz.\n\nDoch langfristig entscheidet etwas anderes: Selbstführung.\n\nIch habe im Verlauf meiner unternehmerischen Reise gelernt, wie entscheidend Tagesorganisation und strukturierte Planung sind.\n\nWer seine eigenen Abläufe nicht kontrolliert, verliert irgendwann die Kontrolle über sein Unternehmen.',
    insight: 'KI kann hier ein starker Partner sein – bei Planung, Struktur und Kontrolle.',
  },
  {
    icon: ShieldAlert,
    headline: 'Du schützt dein Unternehmen nicht ausreichend.',
    story: 'Einer meiner größten Fehler war, mein Unternehmen nicht ausreichend abzusichern.\n\nIn schwierigen Zeiten können Menschen Entscheidungen treffen, die für dein Unternehmen schädlich sind.\n\nOhne klare Kontrollprozesse, Datenüberwachung und Struktur entstehen Risiken, die viele Unternehmer unterschätzen.',
    insight: 'Heute lassen sich viele dieser Prozesse technisch absichern – auch mit KI. Zum Beispiel durch Monitoring von Datenbewegungen oder automatisierte Kontrollsysteme.',
  },
  {
    icon: Compass,
    headline: 'Du triffst Entscheidungen alleine.',
    story: 'Je größer dein Unternehmen wird, desto weniger Menschen gibt es, mit denen du offen über Entscheidungen sprechen kannst.\n\nViele Gespräche im Business haben eigene Interessen.\n\nManchmal hilft es enorm, eine neutrale Perspektive auf Entscheidungen zu bekommen.',
    insight: 'Heute nutze ich dafür strukturierte Systeme – und auch KI – um Entscheidungen zu reflektieren, Risiken abzuwägen und neue Perspektiven zu prüfen.',
  },
];

export function SituationsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-28 px-6 lg:px-8 bg-muted">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F3D2E] mb-4 leading-tight">
            Vielleicht kennst du diese Situationen.
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
            Unternehmertum bringt Phasen mit, in denen Erfahrung und Struktur den Unterschied machen.
          </p>
        </ScrollReveal>

        <div className="space-y-5">
          {situations.map((item, index) => {
            const isOpen = openIndex === index;
            const Icon = item.icon;

            return (
              <ScrollReveal key={index} delay={index * 0.08}>
                <div
                  className={`bg-white rounded-2xl border-2 transition-all duration-300 ${
                    isOpen
                      ? 'shadow-lg border-[#0F3D2E] -translate-y-0.5'
                      : 'shadow-sm border-transparent hover:shadow-lg hover:border-[#0F3D2E] hover:-translate-y-1'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center gap-5 p-6 md:p-7 text-left"
                  >
                    <div className={`shrink-0 size-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isOpen ? 'bg-[#0F3D2E] text-white' : 'bg-[#0F3D2E]/10 text-[#0F3D2E]'
                    }`}>
                      <Icon className="size-5" />
                    </div>
                    <span className="flex-1 text-lg md:text-xl font-bold text-foreground leading-snug">
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
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-7 pb-7 pt-0 ml-0 md:ml-[4.25rem] space-y-4">
                          <div className="text-muted-foreground leading-relaxed space-y-3">
                            {item.story.split('\n\n').map((p, i) => (
                              <p key={i}>{highlightText(p)}</p>
                            ))}
                          </div>
                          <p className="text-[#0F3D2E] font-semibold leading-relaxed">
                            {highlightText(item.insight)}
                          </p>
                          <button
                            onClick={scrollToContact}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F3D2E] hover:underline underline-offset-4 transition-all mt-1"
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
