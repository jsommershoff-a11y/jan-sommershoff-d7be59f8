import { siteData } from '@/data/siteData';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-primary">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-foreground">
            {siteData.cta.headline}
          </h2>
          <div className="space-y-4 text-left md:text-center">
            {siteData.cta.text.split('\n\n').map((p, i) => (
              <p key={i} className="text-lg text-primary-foreground/70 font-light max-w-xl mx-auto leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <a
            href="https://krs-signature.de/auth?src=jan"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-12 py-5 bg-white text-primary font-bold rounded-xl text-lg shadow-[0_4px_30px_rgba(255,255,255,0.25)] hover:shadow-[0_8px_40px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-xl bg-white animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite] opacity-15" />
            <span className="relative">{siteData.cta.button}</span>
            <ArrowRight className="relative size-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}