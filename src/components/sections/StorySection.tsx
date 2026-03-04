import { siteData } from '@/data/siteData';
import aboutImage from '@/assets/about-jan.jpeg';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function StorySection() {
  return (
    <section id="story" className="py-24 md:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <p className="text-sm font-semibold tracking-widest uppercase text-accent">
                Über mich
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {siteData.story.headline}
              </h2>
              <div className="space-y-4">
                {siteData.story.paragraphs.map((p, i) => {
                  // Highlight key insight paragraphs
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
            </div>
            <div className="relative sticky top-32">
              <img
                src={aboutImage}
                alt="Jan Sommershoff – Business Portrait"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/10 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent/5 rounded-2xl -z-10" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
