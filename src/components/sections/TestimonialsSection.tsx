import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { siteData } from '@/data/siteData';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-32 px-4 md:px-6 lg:px-8 bg-muted">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3 md:mb-4">
              Stimmen
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">
              Ergebnisse unserer Partner.
            </h2>
          </div>
        </ScrollReveal>

        {/* Mobile: horizontal swipe carousel, Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {siteData.testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <TestimonialCard testimonial={t} />
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile: stacked with tighter spacing */}
        <div className="flex flex-col gap-4 md:hidden">
          {siteData.testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <TestimonialCard testimonial={t} compact />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <p className="text-center text-xs text-muted-foreground mt-8 md:mt-10 italic">
            Echte Erfahrungen – Namen auf Wunsch anonymisiert.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  compact = false,
}: {
  testimonial: (typeof siteData.testimonials)[number];
  compact?: boolean;
}) {
  return (
    <div
      className={`bg-card border border-border rounded-2xl ${
        compact ? 'p-5' : 'p-8'
      } h-full flex flex-col relative`}
    >
      <Quote
        className={`text-primary/15 absolute ${
          compact ? 'size-6 top-4 right-4' : 'size-8 top-6 right-6'
        }`}
      />

      {/* Stars */}
      <div className="flex gap-0.5 mb-3 md:mb-5">
        {Array.from({ length: testimonial.stars }).map((_, s) => (
          <Star key={s} className="size-3.5 md:size-4 fill-accent text-accent" />
        ))}
      </div>

      {/* Quote */}
      <p
        className={`text-muted-foreground leading-relaxed flex-1 ${
          compact ? 'text-sm mb-4' : 'mb-6'
        }`}
      >
        „{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="border-t border-border pt-3 md:pt-4">
        <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
      </div>
    </div>
  );
}
