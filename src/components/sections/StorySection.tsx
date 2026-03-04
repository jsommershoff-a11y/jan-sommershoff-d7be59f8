import { siteData } from '@/data/siteData';
import aboutImage from '@/assets/hero-jan-new.png';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight } from 'lucide-react';

export function StorySection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="story" className="py-24 md:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <p className="text-sm font-semibold tracking-widest uppercase text-primary">
                Über mich
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {siteData.story.headline}
              </h2>
              <div className="space-y-4">
                {siteData.story.paragraphs.map((p, i) => {
                  const isHighlight =
                    p.startsWith('Ein Unternehmen ohne') ||
                    p.startsWith('Die größten Krisen') ||
                    p.startsWith('Genau dabei');
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
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                Gespräch anfragen
                <ArrowRight className="size-4" />
              </button>
            </div>
            <div className="relative sticky top-32">
              <img
                src={aboutImage}
                alt="Jan Sommershoff – Business Portrait"
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
