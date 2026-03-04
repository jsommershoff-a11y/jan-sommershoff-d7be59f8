import { siteData } from '@/data/siteData';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Cpu, ArrowRight } from 'lucide-react';

export function KiZukunftSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-muted">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Cpu className="size-8 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {siteData.kiZukunft.headline}
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="space-y-5">
            {siteData.kiZukunft.paragraphs.map((p, i) => {
              const isHighlight =
                p.startsWith('Strategie.') ||
                p.startsWith('Fehlerquoten') ||
                p.startsWith('Wer heute');
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
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 text-center">
            <a
              href="/auth"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              KI Notfallkoffer entdecken
              <ArrowRight className="size-4" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
