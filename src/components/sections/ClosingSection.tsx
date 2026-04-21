import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight } from 'lucide-react';

export function ClosingSection() {
  return (
    <section className="relative">
      <div className="py-16 md:py-36 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-[#0F3D2E] to-[#0a2e21] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_60%)] pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <ScrollReveal>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-14 leading-tight text-center">
              Zukunftssicher mit KI & Automatisierung
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="text-white/65 text-base md:text-xl leading-relaxed space-y-6 md:space-y-8 text-left md:text-center">
              <p>
                Unternehmen stehen heute vor einer klaren Entscheidung:
              </p>

              <p className="text-white font-semibold text-lg md:text-2xl">
                Jetzt handeln – oder den Anschluss verlieren.
              </p>

              <p>
                Manuelle Prozesse kosten dein Team jede Woche Stunden an wertvoller Arbeitszeit.<br />
                Unstrukturierte Daten machen fundierte Entscheidungen unmöglich.<br />
                Fehlende Systeme bremsen dein Wachstum.
              </p>

              <p className="text-[#6fcfab] font-semibold text-base md:text-xl">
                Bis zu 30 Stunden pro Woche lassen sich durch intelligente Automatisierung einsparen.
              </p>

              <p>
                Deine Daten werden sicher und strukturiert aufgestellt – bereit für die KI-Zukunft.<br />
                Deine Prozesse werden skalierbar und effizient.<br />
                Dein Team kann sich auf das konzentrieren, was wirklich zählt.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-16 h-px bg-white/15 mx-auto my-10 md:my-16" />

          <ScrollReveal delay={0.15}>
            <div className="text-white/65 text-base md:text-xl leading-relaxed space-y-6 md:space-y-8 text-left md:text-center">
              <p className="text-white font-semibold">
                Was wir gemeinsam analysieren:
              </p>

              <ul className="text-left max-w-xl mx-auto space-y-4">
                <li className="flex items-start gap-4">
                  <span className="shrink-0 mt-2 size-2 rounded-full bg-[#6fcfab]" />
                  <span>Wo manuelle Prozesse dein Team ausbremsen</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="shrink-0 mt-2 size-2 rounded-full bg-[#6fcfab]" />
                  <span>Wo deine Daten nicht zukunftssicher aufgestellt sind</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="shrink-0 mt-2 size-2 rounded-full bg-[#6fcfab]" />
                  <span>Wo KI dir sofort messbare Ergebnisse liefern kann</span>
                </li>
              </ul>

              <p>
                Es spielt dabei keine Rolle, in welcher Branche du tätig bist.
              </p>

              <p className="text-white font-semibold">
                Ob Handwerker, Berater, Arzt, Agentur oder klassisches Unternehmen.
              </p>

              <p className="text-[#6fcfab] font-semibold text-base md:text-xl">
                Die Grundstrukturen sind immer ähnlich – und genau dort setzen wir an.
              </p>

              <p className="text-white font-bold text-lg md:text-2xl py-3 leading-snug">
                Die Frage ist nicht ob, sondern wann du dein Unternehmen KI-fit machst.
              </p>
            </div>
          </ScrollReveal>

          <div className="w-16 h-px bg-white/15 mx-auto my-10 md:my-16" />

          <ScrollReveal delay={0.2}>
            <div className="text-center">
              <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-10">
                Lass uns herausfinden, wo KI in deinem Unternehmen sofort wirkt
              </h3>

              <div className="text-white/65 text-base md:text-xl leading-relaxed space-y-6 md:space-y-8 text-left md:text-center mb-8 md:mb-12">
                <p className="text-white font-semibold text-base md:text-xl">
                  Nimm dir 30 Minuten Zeit.
                </p>

                <p>
                  In einer kostenlosen Potenzialanalyse schauen wir gemeinsam auf dein Unternehmen und identifizieren die größten Automatisierungspotenziale.
                </p>

                <p className="text-[#6fcfab] font-semibold text-base md:text-xl">
                  Damit dein Unternehmen morgen effizienter, sicherer und zukunftsfähiger arbeitet.
                </p>
              </div>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-white text-[#0F3D2E] font-bold text-base md:text-xl px-6 md:px-16 py-4 md:py-5 rounded-xl shadow-[0_4px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_40px_rgba(255,255,255,0.25)] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="absolute inset-0 rounded-xl bg-white animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite] opacity-10" />
                <span className="relative">Kostenlose Potenzialanalyse starten</span>
                <ArrowRight className="relative size-5 md:size-6 group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
