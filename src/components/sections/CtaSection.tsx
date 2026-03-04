import { siteData } from '@/data/siteData';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function CtaSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

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
          <button
            onClick={() => scrollTo('contact')}
            className="px-10 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors text-lg shadow-lg"
          >
            {siteData.cta.button}
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
