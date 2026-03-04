import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight } from 'lucide-react';

export function ClosingSection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative">
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="py-24 md:py-32 px-6 lg:px-8 bg-gradient-to-b from-[#0F3D2E] to-[#0a2e21] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_60%)] pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Part 1: Warum ich dir helfen kann */}
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 leading-tight text-center">
              Warum ich dir gerade jetzt helfen kann
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="text-white/70 text-lg md:text-xl leading-relaxed space-y-6 text-left md:text-center">
              <p>
                Viele Menschen suchen nach Beratern, die auf ihren Webseiten erzählen, wie erfolgreich sie sind.<br />
                Wie stark sie sind.<br />
                Was sie alles erreicht haben.
              </p>

              <p className="text-white/90 font-medium">
                Aber echtes Wachstum entsteht selten in den einfachen Zeiten.
              </p>

              <p className="text-white font-semibold">
                Echtes Wachstum entsteht unter Druck.<br />
                Wenn Entscheidungen plötzlich Konsequenzen haben.<br />
                Wenn du merkst, dass du vielleicht einen falschen Schritt gemacht hast.
              </p>

              <p className="text-white/90 font-medium">
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

              <p className="text-white font-semibold text-xl md:text-2xl py-2">
                Gehe ich zehn Schritte weiter nach vorne –<br />
                oder gehe ich einen Schritt zurück, um mein Fundament neu aufzubauen?
              </p>

              <p>
                Viele Unternehmer trauen sich diesen Schritt nicht.
              </p>

              <p className="text-white/90 font-medium">
                Genau hier beginnt meistens das eigentliche Problem.
              </p>
            </div>
          </ScrollReveal>

          {/* Divider */}
          <ScrollReveal delay={0.15}>
            <div className="w-12 h-px bg-white/20 mx-auto my-14" />
          </ScrollReveal>

          {/* Part 2: Was wir gemeinsam tun */}
          <ScrollReveal delay={0.15}>
            <div className="text-white/70 text-lg md:text-xl leading-relaxed space-y-6 text-left md:text-center">
              <p className="text-white font-semibold">
                Ich werde dich nicht beurteilen.<br />
                Ich werde dir keine theoretischen Konzepte verkaufen.
              </p>

              <p className="text-white/90 font-medium">
                Wir schauen gemeinsam auf dein Unternehmen.
              </p>

              <p>Wir finden heraus:</p>

              <ul className="text-left max-w-xl mx-auto space-y-3">
                <li className="flex items-start gap-3">
                  <span className="shrink-0 mt-1.5 size-2 rounded-full bg-white/40" />
                  <span>wo deine Prozesse Zeit und Energie verbrennen</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 mt-1.5 size-2 rounded-full bg-white/40" />
                  <span>wo Entscheidungen unnötig schwer werden</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 mt-1.5 size-2 rounded-full bg-white/40" />
                  <span>wo KI dir sofort echte Entlastung bringen kann</span>
                </li>
              </ul>

              <p>
                Ich habe in meinen Unternehmen mehrere hundert Prozesse aufgebaut und optimiert.
              </p>

              <p className="text-white/90 font-medium">Ich weiß heute sehr genau:</p>

              <ul className="text-left max-w-xl mx-auto space-y-3">
                <li className="flex items-start gap-3">
                  <span className="shrink-0 mt-1.5 size-2 rounded-full bg-[#0F3D2E] ring-2 ring-white/20" />
                  <span>welche KI für welche Aufgaben wirklich sinnvoll ist</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 mt-1.5 size-2 rounded-full bg-[#0F3D2E] ring-2 ring-white/20" />
                  <span>wo Automatisierung enorme Wirkung hat</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 mt-1.5 size-2 rounded-full bg-[#0F3D2E] ring-2 ring-white/20" />
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

              <p className="text-white/90 font-medium">
                Unternehmen funktionieren in ihren Grundstrukturen immer ähnlich.
              </p>

              <p>Die Frage ist nur:</p>

              <p className="text-white font-semibold text-xl md:text-2xl py-2">
                Baust du jetzt ein stabiles Fundament aus klaren Prozessen und KI-gestützten Systemen –<br />
                oder wartest du, bis der Druck noch größer wird?
              </p>
            </div>
          </ScrollReveal>

          {/* Divider */}
          <ScrollReveal delay={0.2}>
            <div className="w-12 h-px bg-white/20 mx-auto my-14" />
          </ScrollReveal>

          {/* Part 3: CTA */}
          <ScrollReveal delay={0.2}>
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Wenn du gerade an diesem Punkt stehst
              </h3>

              <div className="text-white/70 text-lg md:text-xl leading-relaxed space-y-6 text-left md:text-center mb-10">
                <p className="text-white/90 font-medium">
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

                <p className="text-white/90 font-medium">
                  Damit dein Unternehmen danach wieder mit klarer Struktur nach vorne wachsen kann.
                </p>
              </div>

              <p className="text-white/50 text-base italic mb-4">
                Welche Situation beschäftigt dich gerade am meisten?
              </p>

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
