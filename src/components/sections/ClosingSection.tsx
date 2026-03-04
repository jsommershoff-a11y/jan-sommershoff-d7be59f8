import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight } from 'lucide-react';

export function ClosingSection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative">
      {/* Subtle top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="py-24 md:py-32 px-6 lg:px-8 bg-gradient-to-b from-[#0F3D2E] to-[#0a2e21] relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_60%)] pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10 leading-tight">
              Wenn du gerade an diesem Punkt stehst.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="text-white/70 text-lg md:text-xl leading-relaxed space-y-6 text-left md:text-center">
              <p>
                Wenn du gerade an diesem Punkt stehst, kennst du vielleicht dieses Gefühl.
              </p>

              <p>
                Du hast Entscheidungen getroffen, die sich im Nachhinein nicht richtig angefühlt haben.
              </p>

              <p>
                Und statt einen Schritt zurückzugehen, versucht man oft noch stärker nach vorne zu gehen.
              </p>

              <p className="text-white font-semibold">
                Noch eine Entscheidung.<br />
                Noch ein Projekt.<br />
                Noch mehr Druck.
              </p>

              <p className="text-white/90 font-medium">
                Ich kenne genau diese Phase.
              </p>

              <p>
                Viele Unternehmer denken in solchen Momenten, jetzt sei der falsche Zeitpunkt, um innezuhalten.
              </p>

              <p className="text-white font-semibold text-xl md:text-2xl">
                In Wahrheit ist genau jetzt der wichtigste Zeitpunkt.
              </p>

              <p className="text-white font-semibold">
                Stoppe kurz.<br />
                Gehe einen Schritt zurück.<br />
                Schaffe Struktur.
              </p>

              <p>
                Mit klaren Prozessen und KI-gestützten Systemen kannst du dein Unternehmen so aufbauen, dass Entscheidungen wieder leichter werden.
              </p>

              <p className="text-white/90 font-medium">
                Nimm dir eine halbe Stunde Zeit.
              </p>

              <p>
                In einem ersten Gespräch schauen wir gemeinsam auf dein Unternehmen und finden heraus, wo gerade die größten Engpässe liegen – die Punkte, die dir Zeit rauben und dein Wachstum begrenzen.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-12">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2.5 bg-white text-[#0F3D2E] font-bold text-lg px-10 py-4 rounded-lg shadow-[0_4px_24px_rgba(255,255,255,0.15)] hover:shadow-[0_6px_32px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Kostenlose Analyse starten
                <ArrowRight className="size-5" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
