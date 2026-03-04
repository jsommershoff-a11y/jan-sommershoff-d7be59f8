import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight } from 'lucide-react';

export function ClosingSection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative">
      <div className="py-24 md:py-36 px-6 lg:px-8 bg-gradient-to-b from-[#0F3D2E] to-[#0a2e21] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_60%)] pointer-events-none" />

        {/* Large decorative quote marks */}
        <span className="absolute top-12 left-[8%] text-[12rem] md:text-[18rem] leading-none font-serif text-white/[0.02] pointer-events-none select-none">
          „
        </span>
        <span className="absolute bottom-12 right-[8%] text-[12rem] md:text-[18rem] leading-none font-serif text-white/[0.02] pointer-events-none select-none rotate-180">
          „
        </span>

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Part 1 */}
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-14 leading-tight text-center">
              Warum ich dir gerade jetzt helfen kann
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="text-white/65 text-lg md:text-xl leading-relaxed space-y-8 text-left md:text-center">
              <p>
                Viele Menschen suchen nach Beratern, die auf ihren Webseiten erzählen, wie erfolgreich sie sind.<br />
                Wie stark sie sind.<br />
                Was sie alles erreicht haben.
              </p>

              <p className="text-white font-semibold text-xl md:text-2xl">
                Aber echtes Wachstum entsteht selten in den einfachen Zeiten.
              </p>

              <p className="text-white font-semibold">
                Echtes Wachstum entsteht unter Druck.<br />
                Wenn Entscheidungen plötzlich Konsequenzen haben.<br />
                Wenn du merkst, dass du vielleicht einen falschen Schritt gemacht hast.
              </p>

              <p className="text-[#6fcfab] font-semibold text-xl">
                Ich kenne genau diese Situation.
              </p>

              <p>
                Ich weiß, wie es sich anfühlt, wenn du erkennst, dass eine Entscheidung falsch war.<br />
                Wenn du merkst, dass dein Unternehmen zu schnell gewachsen ist.<br />
                Dass die Umsätze steigen – aber die Kosten genauso.
              </p>

              <p>
                Und plötzlich musst du eine Entscheidung treffen:
              </p>

              <p className="text-white font-bold text-xl md:text-2xl py-3 leading-snug">
                Gehe ich zehn Schritte weiter nach vorne –<br />
                oder gehe ich einen Schritt zurück, um mein Fundament neu aufzubauen?
              </p>

              <p>
                Viele Unternehmer trauen sich diesen Schritt nicht.
              </p>

              <p className="text-[#6fcfab] font-semibold text-xl">
                Genau hier beginnt meistens das eigentliche Problem.
              </p>
            </div>
          </ScrollReveal>

          {/* Divider */}
          <div className="w-16 h-px bg-white/15 mx-auto my-16" />

          {/* Part 2 */}
          <ScrollReveal delay={0.15}>
            <div className="text-white/65 text-lg md:text-xl leading-relaxed space-y-8 text-left md:text-center">
              <p className="text-white font-semibold">
                Ich werde dich nicht beurteilen.<br />
                Ich werde dir keine theoretischen Konzepte verkaufen.
              </p>

              <p className="text-[#6fcfab] font-semibold text-xl">
                Wir schauen gemeinsam auf dein Unternehmen.
              </p>

              <p>Wir finden heraus:</p>

              <ul className="text-left max-w-xl mx-auto space-y-4">
                <li className="flex items-start gap-4">
                  <span className="shrink-0 mt-2 size-2 rounded-full bg-[#6fcfab]" />
                  <span>wo deine Prozesse Zeit und Energie verbrennen</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="shrink-0 mt-2 size-2 rounded-full bg-[#6fcfab]" />
                  <span>wo Entscheidungen unnötig schwer werden</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="shrink-0 mt-2 size-2 rounded-full bg-[#6fcfab]" />
                  <span>wo KI dir sofort echte Entlastung bringen kann</span>
                </li>
              </ul>

              <p>
                Ich habe in meinen Unternehmen mehrere hundert Prozesse aufgebaut und optimiert.
              </p>

              <p className="text-white font-semibold">Ich weiß heute sehr genau:</p>

              <ul className="text-left max-w-xl mx-auto space-y-4">
                <li className="flex items-start gap-4">
                  <span className="shrink-0 mt-2 size-2 rounded-full bg-white/30" />
                  <span>welche KI für welche Aufgaben wirklich sinnvoll ist</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="shrink-0 mt-2 size-2 rounded-full bg-white/30" />
                  <span>wo Automatisierung enorme Wirkung hat</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="shrink-0 mt-2 size-2 rounded-full bg-white/30" />
                  <span>und wo Entscheidungen weiterhin bewusst vom Menschen getroffen werden müssen</span>
                </li>
              </ul>

              <p>
                Es spielt dabei keine Rolle, in welcher Branche du tätig bist.
              </p>

              <p className="text-white font-semibold">
                Ob Handwerker.<br />
                Berater.<br />
                Arzt.<br />
                Agentur.<br />
                oder klassisches Unternehmen.
              </p>

              <p className="text-[#6fcfab] font-semibold text-xl">
                Unternehmen funktionieren in ihren Grundstrukturen immer ähnlich.
              </p>

              <p>Die Frage ist nur:</p>

              <p className="text-white font-bold text-xl md:text-2xl py-3 leading-snug">
                Baust du jetzt ein stabiles Fundament aus klaren Prozessen und KI-gestützten Systemen –<br />
                oder wartest du, bis der Druck noch größer wird?
              </p>
            </div>
          </ScrollReveal>

          {/* Divider */}
          <div className="w-16 h-px bg-white/15 mx-auto my-16" />

          {/* Part 3: CTA */}
          <ScrollReveal delay={0.2}>
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-10">
                Wenn du gerade an diesem Punkt stehst
              </h3>

              <div className="text-white/65 text-lg md:text-xl leading-relaxed space-y-8 text-left md:text-center mb-12">
                <p className="text-white font-semibold text-xl">
                  Nimm dir 30 Minuten Zeit.
                </p>

                <p>
                  In einem ersten Gespräch schauen wir gemeinsam auf dein Unternehmen und finden heraus, wo gerade die größten Engpässe liegen.
                </p>

                <p className="text-white font-semibold">
                  Die Punkte, die dir Zeit rauben.<br />
                  Die Entscheidungen, die dich blockieren.<br />
                  Und die Prozesse, die dein Wachstum aktuell limitieren.
                </p>

                <p>
                  Vielleicht ist genau jetzt der richtige Moment, um einen Schritt zurückzugehen.
                </p>

                <p className="text-[#6fcfab] font-semibold text-xl">
                  Damit dein Unternehmen danach wieder mit klarer Struktur nach vorne wachsen kann.
                </p>
              </div>

              <p className="text-white/40 text-base italic mb-6">
                Welche Situation beschäftigt dich gerade am meisten?
              </p>

              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-3 bg-white text-[#0F3D2E] font-bold text-lg md:text-xl px-12 md:px-16 py-5 rounded-xl shadow-[0_4px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_40px_rgba(255,255,255,0.25)] hover:-translate-y-1 transition-all duration-300"
              >
                Kostenlose Analyse starten
                <ArrowRight className="size-6" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
