import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { siteData } from '@/data/siteData';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-muted">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">
              Stimmen
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Was Unternehmer sagen
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {siteData.testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="bg-card border border-border rounded-2xl p-8 h-full flex flex-col relative">
                <Quote className="size-8 text-primary/15 absolute top-6 right-6" />
                
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} className="size-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-muted-foreground leading-relaxed flex-1 mb-6">
                  „{t.quote}"
                </p>

                {/* Author */}
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <p className="text-center text-xs text-muted-foreground mt-10 italic">
            Echte Erfahrungen – Namen auf Wunsch anonymisiert.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
