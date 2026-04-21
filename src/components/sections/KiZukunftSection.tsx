import { siteData } from '@/data/siteData';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Link } from 'react-router-dom';
import { Cpu, ArrowRight } from 'lucide-react';

export function KiZukunftSection() {
  return (
    <section className="py-16 md:py-32 px-4 md:px-6 lg:px-8 bg-muted">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-8 md:mb-12 space-y-3 md:space-y-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Cpu className="size-7 md:size-8 text-accent" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
              {siteData.kiZukunft.headline}
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="space-y-4 md:space-y-5">
            {siteData.kiZukunft.paragraphs.map((p, i) => {
              const isHighlight =
                p.startsWith('Genau hier') ||
                p.startsWith('Wer heute') ||
                p.startsWith('Wer wartet') ||
                p.startsWith('Unternehmen, die KI');
              return (
                <p
                  key={i}
                  className={
                    isHighlight
                      ? 'text-base md:text-lg font-semibold text-foreground leading-relaxed whitespace-pre-line'
                      : 'text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line'
                  }
                >
                  {p}
                </p>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 md:mt-10 text-center">
            <Link
              to="/kontakt?ziel=notfallkoffer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 md:px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              Notfallkoffer anfragen
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
