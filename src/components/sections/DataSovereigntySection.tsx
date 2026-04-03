import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ShieldAlert, Database, CloudOff, UserMinus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const risks = [
  {
    icon: ShieldAlert,
    title: 'Steuerberater geht insolvent',
    text: 'Deine Finanzdaten liegen beim Dienstleister – nicht bei dir. Im Ernstfall stehst du ohne Zugriff da.',
  },
  {
    icon: CloudOff,
    title: 'Cloud-Anbieter zieht sich zurück',
    text: 'Dein CRM, deine Dokumente, deine Kundendaten – alles in einer externen Cloud. Was passiert, wenn der Anbieter abschaltet?',
  },
  {
    icon: UserMinus,
    title: 'Mitarbeiter verlässt das Unternehmen',
    text: 'Kundenwissen, Kontakte, Prozess-Know-how – alles im Kopf einer Person. Wenn sie geht, geht das Wissen mit.',
  },
  {
    icon: Database,
    title: 'Datenleck oder Cyberangriff',
    text: 'Kundendaten werden gestohlen. Das Vertrauen deiner Kunden ist zerstört – und oft auch dein Geschäft.',
  },
];

export function DataSovereigntySection() {
  return (
    <section className="relative py-20 md:py-32 px-5 md:px-6 lg:px-8 bg-[#111111] text-white overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14 md:mb-20">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary/80 mb-4">
              Datensouveränität
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Deine Daten gehören dir.{' '}
              <span className="text-white/40">Oder?</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Die meisten Unternehmer merken erst im Ernstfall, dass sie keine Kontrolle über ihre eigenen Daten haben.
            </p>
          </div>
        </ScrollReveal>

        {/* Risk Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-16 md:mb-20">
          {risks.map((risk, i) => {
            const Icon = risk.icon;
            return (
              <ScrollReveal key={risk.title} delay={i * 0.1}>
                <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 md:p-8 hover:border-primary/20 hover:bg-white/[0.05] transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                      <Icon className="size-5 text-red-400/80" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                        {risk.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {risk.text}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Core Message */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                Die Lösung
              </span>
            </div>

            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug">
              Wer in Zukunft KI nutzen will, braucht eine{' '}
              <span className="text-primary">zentrale Datenbank</span> aller
              Unternehmensinformationen — sicher, strukturiert, unter eigener
              Kontrolle.
            </p>

            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Nur so funktioniert personalisierte Kundenansprache. Nur so
              funktioniert KI. Denn Personality bleibt das Wichtigste — und die
              erreichst du nur, wenn deine Daten zentral bei dir liegen und du
              sie gezielt in deinen eigenen KI-Systemen einsetzen kannst.
            </p>

            <motion.a
              href="#terminbuchung"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('terminbuchung')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 mt-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm tracking-wide transition-colors shadow-lg shadow-primary/20"
            >
              Datensicherheit prüfen lassen
              <ArrowRight className="size-4" />
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
