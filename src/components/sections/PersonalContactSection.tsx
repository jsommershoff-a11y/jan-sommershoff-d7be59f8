import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight, MessageCircle } from 'lucide-react';
import aboutImage from '@/assets/hero-jan-new.png';

export function PersonalContactSection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-28 px-6 lg:px-8 bg-[#111111] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(15,61,46,0.08),transparent_60%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-10 md:gap-14 items-start">
          {/* Portrait */}
          <ScrollReveal>
            <div className="mx-auto md:mx-0 w-56 md:w-full">
              <div className="relative">
                <img
                  src={aboutImage}
                  alt="Jan Sommershoff – Persönliches Gespräch"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
              </div>
              <div className="mt-4 text-center md:text-left">
                <p className="text-white font-bold text-lg">Jan Sommershoff</p>
                <p className="text-white/50 text-sm">Unternehmer & KI-Stratege</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Text content */}
          <div>
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Ich antworte persönlich.
              </h2>
              <div className="w-16 h-0.5 bg-[#0F3D2E] mb-10" />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="text-white/65 text-lg leading-relaxed space-y-6">
                <p>
                  Viele Unternehmer stehen irgendwann an einem Punkt, an dem sie merken:
                </p>

                <p className="text-white font-semibold text-xl">
                  So kann es gerade nicht weitergehen.
                </p>

                <p>
                  Die Entscheidungen werden schwerer.<br />
                  Der Druck wird größer.<br />
                  Und manchmal weiß man selbst nicht mehr genau, wo man anfangen soll.
                </p>

                <p className="text-[#6fcfab] font-semibold">
                  Ich kenne genau diese Situationen.
                </p>

                <p>
                  Deshalb antworte ich auf viele Nachrichten persönlich.
                </p>

                <p>
                  Wenn du gerade an einem Punkt stehst, an dem du merkst, dass dein Unternehmen Struktur, Klarheit oder einfach eine neue Perspektive braucht, kannst du mir direkt schreiben.
                </p>

                <p className="text-white/90 font-medium">
                  Manchmal reicht schon ein kurzes Gespräch, um wieder klarer zu sehen.
                </p>

                <p>
                  Und manchmal erkennen wir gemeinsam, welche Prozesse oder KI-Systeme dein Unternehmen sofort entlasten können.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-white/40 text-base italic mt-10 mb-6">
                Welche Situation beschäftigt dich gerade am meisten?
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/491751127114"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold text-base px-8 py-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Glow animation */}
                  <span className="absolute inset-0 rounded-full bg-[#25D366] animate-[pulse_2.5s_cubic-bezier(0.4,0,0.6,1)_infinite] opacity-20" />
                  <svg className="relative size-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="relative">Direkt auf WhatsApp schreiben</span>
                </a>

                {/* Secondary CTA */}
                <a
                  href="https://krs-signature.de/auth?src=jan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 border-2 border-white/20 text-white font-semibold text-base px-8 py-4 rounded-full hover:border-primary hover:bg-primary/20 transition-all duration-300"
                >
                  Analysegespräch buchen
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <p className="text-white/30 text-sm mt-4 flex items-center gap-2">
                <MessageCircle className="size-3.5" />
                Antwort meist innerhalb von 24 Stunden
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
