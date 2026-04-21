import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ChevronDown, Clock, Database, TrendingDown, LayoutList, ShieldAlert, Compass } from 'lucide-react';

const highlights = [
  'KI', 'Automatisierung', 'automatisieren', 'strukturiert', 'Struktur',
  'Systeme', '30 Stunden', 'Zeitersparnis', 'Datensicherheit', 'zukunftssicher',
  'skalierbar', 'Wettbewerbsvorteil', 'KI-gestützt', 'datenbasiert',
];

function highlightText(text: string) {
  const sorted = [...highlights].sort((a, b) => b.length - a.length);
  const pattern = sorted.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${pattern})`, 'g');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    sorted.some(h => h === part)
      ? <span key={i} className="text-primary font-semibold">{part}</span>
      : part
  );
}

const situations = [
  {
    icon: Clock,
    headline: 'Dein Team verbringt zu viel Zeit mit manuellen Aufgaben.',
    story: 'Rechnungen manuell erfassen, E-Mails sortieren, Daten von A nach B kopieren.\n\nDas sind Aufgaben, die täglich Stunden kosten – und die sich automatisieren lassen.\n\nViele Unternehmen unterschätzen, wie viel Zeit durch Routinearbeit verloren geht.',
    insight: 'Durch gezielte Automatisierung lassen sich bis zu 30 Stunden pro Woche einsparen. Zeit, die dein Team für wertschöpfende Arbeit nutzen kann.',
  },
  {
    icon: Database,
    headline: 'Deine Unternehmensdaten sind nicht zukunftssicher.',
    story: 'Daten liegen verstreut in verschiedenen Tools, Excel-Tabellen und E-Mail-Postfächern.\n\nNiemand hat einen vollständigen Überblick.\n\nWenn KI in Zukunft Entscheidungen unterstützen soll, braucht sie saubere, strukturiert aufbereitete Daten.',
    insight: 'Wir sorgen dafür, dass deine Daten strukturiert, sicher und KI-ready aufgestellt werden – damit du jederzeit datenbasiert entscheiden kannst.',
  },
  {
    icon: TrendingDown,
    headline: 'Deine Konkurrenz automatisiert bereits.',
    story: 'Während du noch manuell arbeitest, setzen andere Unternehmen bereits KI ein.\n\nSie treffen schnellere Entscheidungen, haben niedrigere Kosten und skalieren effizienter.\n\nDer Wettbewerbsvorteil durch KI wächst mit jedem Monat, den du wartest.',
    insight: 'Wer heute nicht handelt, verliert morgen den Anschluss. KI-gestützt Prozesse aufzubauen ist kein Trend – es ist eine strategische Notwendigkeit.',
  },
  {
    icon: LayoutList,
    headline: 'Deine Prozesse sind nicht skalierbar.',
    story: 'Was bei 5 Mitarbeitern funktioniert, bricht bei 20 zusammen.\n\nOhne klare Systeme und automatisierte Abläufe wird jedes Wachstum zum Risiko.\n\nSkalierung braucht Struktur – und Struktur braucht Systeme.',
    insight: 'Wir bauen mit dir Prozesse auf, die mitwachsen. Durch Automatisierung und KI werden deine Abläufe skalierbar und stabil.',
  },
  {
    icon: ShieldAlert,
    headline: 'Du weißt nicht, wo deine Daten wirklich liegen.',
    story: 'Kundendaten, Verträge, interne Dokumente – in den meisten Unternehmen ist nicht klar, wer auf was Zugriff hat.\n\nOhne klare Datensicherheit und Struktur entstehen Risiken, die viele unterschätzen.',
    insight: 'Datensicherheit ist kein IT-Thema – es ist ein Unternehmerthema. Wir helfen dir, Ordnung zu schaffen und deine Daten zukunftssicher aufzustellen.',
  },
  {
    icon: Compass,
    headline: 'Du triffst Entscheidungen ohne Datengrundlage.',
    story: 'Viele unternehmerische Entscheidungen werden aus dem Bauch heraus getroffen.\n\nDas funktioniert manchmal – aber nicht systematisch.\n\nKI kann dir helfen, Entscheidungen auf Basis von echten Daten zu treffen.',
    insight: 'Mit den richtigen Systemen triffst du bessere Entscheidungen – schneller und datenbasiert. Das verschafft dir einen echten Wettbewerbsvorteil.',
  },
];

export function SituationsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-28 px-4 md:px-6 lg:px-8 bg-muted">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4 leading-tight">
            Erkennst du dein Unternehmen wieder?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-8 md:mb-12 max-w-2xl">
            Die häufigsten Herausforderungen, die Unternehmen daran hindern, ihr volles Potenzial auszuschöpfen.
          </p>
        </ScrollReveal>

        <div className="space-y-3 md:space-y-5">
          {situations.map((item, index) => {
            const isOpen = openIndex === index;
            const Icon = item.icon;

            return (
              <ScrollReveal key={index} delay={index * 0.08}>
                <div
                  className={`bg-card rounded-2xl border-2 transition-all duration-300 ${
                    isOpen
                      ? 'shadow-lg border-primary -translate-y-0.5'
                      : 'shadow-sm border-transparent hover:shadow-lg hover:border-primary hover:-translate-y-1'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center gap-3 md:gap-5 p-4 md:p-7 text-left"
                  >
                    <div className={`shrink-0 size-10 md:size-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isOpen ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                    }`}>
                      <Icon className="size-4 md:size-5" />
                    </div>
                    <span className="flex-1 text-base md:text-xl font-bold text-foreground leading-snug">
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
                        <div className="px-4 md:px-7 pb-5 md:pb-7 pt-0 ml-0 md:ml-[4.25rem] space-y-3 md:space-y-4 text-sm md:text-base">
                          <div className="text-muted-foreground leading-relaxed space-y-3">
                            {item.story.split('\n\n').map((p, i) => (
                              <p key={i}>{highlightText(p)}</p>
                            ))}
                          </div>
                          <p className="text-primary font-semibold leading-relaxed">
                            {highlightText(item.insight)}
                          </p>
                          <Link
                            to="/kontakt?ziel=potenzialanalyse"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4 transition-all mt-1"
                          >
                            Jetzt Potenzialanalyse anfragen →
                          </Link>
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
