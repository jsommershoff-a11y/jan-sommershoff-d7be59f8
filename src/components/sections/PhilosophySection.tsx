import { siteData } from '@/data/siteData';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Quote } from 'lucide-react';

export function PhilosophySection() {
  return (
    <section className="py-16 md:py-32 px-4 md:px-6 lg:px-8 bg-muted">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
            <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-primary">
              Learnings
            </p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
              {siteData.philosophy.headline}
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-4 md:space-y-6">
          {siteData.philosophy.quotes.map((quote, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="relative p-6 md:p-10 bg-card rounded-2xl border-l-4 border-primary shadow-sm">
                <Quote className="size-6 md:size-8 text-accent/30 absolute top-4 right-4 md:top-6 md:right-6" />
                <p className="text-base md:text-xl text-card-foreground leading-relaxed italic whitespace-pre-line pr-8">
                  „{quote}"
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
