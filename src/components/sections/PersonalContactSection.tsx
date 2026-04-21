import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight, MessageCircle } from 'lucide-react';
import aboutImage from '@/assets/hero-jan-new.png';

export function PersonalContactSection() {
  return (
    <section className="py-16 md:py-28 px-4 md:px-6 lg:px-8 bg-[#111111] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(15,61,46,0.08),transparent_60%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-10 md:gap-14 items-start">
          <ScrollReveal>
            <div className="mx-auto md:mx-0 w-56 md:w-full">
              <div className="relative">
                <img
                  src={aboutImage}
                  alt="Jan Sommershoff – KI-Beratung"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#111111] via-[#111111]/90 to-transparent rounded-b-2xl flex items-end justify-center pb-4">
                  <span className="text-white/90 text-sm font-semibold tracking-[0.2em] uppercase">
                    Automatisierung. Struktur. KI.
                  </span>
                </div>
              </div>
              <div className="mt-4 text-center md:text-left">
                <p className="text-white font-bold text-lg">Jan Sommershoff</p>
                <p className="text-white/50 text-sm">KI-Stratege & Systemarchitekt</p>
              </div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">
                Lass uns gemeinsam prüfen, wo KI sofort Wirkung zeigt.
              </h2>
              <div className="w-16 h-0.5 bg-[#0F3D2E] mb-6 md:mb-10" />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="text-white/65 text-base md:text-lg leading-relaxed space-y-5 md:space-y-6">
                <p>
                  Jedes Unternehmen hat Prozesse, die unnötig Zeit kosten. Aufgaben, die automatisiert werden können. Daten, die besser genutzt werden sollten.
                </p>

                <p className="text-white font-semibold text-lg md:text-xl">
                  Die Frage ist: Weißt du, wo dein größtes Potenzial liegt?
                </p>

                <p>
                  In einem persönlichen Gespräch analysieren wir gemeinsam deine aktuellen Abläufe und identifizieren die Bereiche, in denen KI und Automatisierung sofort messbare Ergebnisse liefern.
                </p>

                <p className="text-[#6fcfab] font-semibold">
                  Bis zu 30 Stunden pro Woche Zeitersparnis sind realistisch.
                </p>

                <p>
                  Gleichzeitig prüfen wir, ob deine Daten sicher und zukunftsfähig aufgestellt sind – damit dein Unternehmen nicht nur heute, sondern auch morgen wettbewerbsfähig bleibt.
                </p>

                <p className="text-white/90 font-medium">
                  Kein Verkaufsgespräch. Sondern eine ehrliche Analyse deines Potenzials.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-white/40 text-base italic mt-10 mb-6">
                Wo siehst du aktuell das größte Verbesserungspotenzial in deinem Unternehmen?
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/message/VSNLCZXNWTSKO1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold text-base px-8 py-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="absolute inset-0 rounded-full bg-[#25D366] animate-[pulse_2.5s_cubic-bezier(0.4,0,0.6,1)_infinite] opacity-20" />
                  <svg className="relative size-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="relative">Direkt auf WhatsApp schreiben</span>
                </a>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center justify-center gap-2.5 border-2 border-white/20 text-white font-semibold text-base px-8 py-4 rounded-full hover:border-primary hover:bg-primary/20 transition-all duration-300"
                >
                  Potenzialanalyse buchen
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
