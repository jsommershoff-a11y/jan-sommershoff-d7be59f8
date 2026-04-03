import { siteData } from '@/data/siteData';
import aboutImage from '@/assets/hero-jan-new.png';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight } from 'lucide-react';

export function StorySection() {
  return (
    <section id="story" className="py-24 md:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <p className="text-sm font-semibold tracking-widest uppercase text-primary">
                Warum KRS
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Wir kennen die Prozesse, die Unternehmen ausbremsen.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mit über 150 Implementierungen wissen wir genau, wo KI und Automatisierung sofort Wirkung zeigen – und wo sie keinen Sinn machen.
              </p>
              <div className="space-y-4">
                {siteData.story.paragraphs.map((p, i) => {
                  const isHighlight =
                    p.startsWith('Genau hier') ||
                    p.startsWith('Das Ergebnis');
                  return (
                    <p
                      key={i}
                      className={
                        isHighlight
                          ? 'text-lg font-semibold text-foreground leading-relaxed whitespace-pre-line'
                          : 'text-base text-muted-foreground leading-relaxed whitespace-pre-line'
                      }
                    >
                      {p}
                    </p>
                  );
                })}
              </div>
              <a
                href="https://krs-signature.de/auth?src=jan"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all shadow-[0_4px_30px_rgba(15,61,46,0.4)] hover:shadow-[0_8px_40px_rgba(15,61,46,0.5)] hover:-translate-y-1 duration-300"
              >
                <span className="absolute inset-0 rounded-xl bg-primary animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite] opacity-20" />
                <span className="relative">Potenzialanalyse anfragen</span>
                <ArrowRight className="relative size-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="relative sticky top-32">
              <img
                src={aboutImage}
                alt="Jan Sommershoff – KI-Stratege & Systemarchitekt"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/5 rounded-2xl -z-10" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
