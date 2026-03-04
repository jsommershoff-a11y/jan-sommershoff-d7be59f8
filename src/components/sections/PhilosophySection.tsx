import { siteData } from '@/data/siteData';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Quote } from 'lucide-react';

export function PhilosophySection() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-muted">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm font-semibold tracking-widest uppercase text-accent">
              Learnings
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {siteData.philosophy.headline}
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {siteData.philosophy.quotes.map((quote, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="relative p-8 md:p-10 bg-card rounded-2xl border-l-4 border-accent shadow-sm">
                <Quote className="size-8 text-accent/15 absolute top-6 right-6" />
                <p className="text-lg md:text-xl text-card-foreground leading-relaxed italic whitespace-pre-line">
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
