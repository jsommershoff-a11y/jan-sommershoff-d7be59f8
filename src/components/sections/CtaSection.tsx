import { siteData } from '@/data/siteData';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function CtaSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-foreground">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-background">
            {siteData.cta.headline}
          </h2>
          <div className="space-y-4 text-left md:text-center">
            {siteData.cta.text.split('\n\n').map((p, i) => (
              <p key={i} className="text-lg text-background/70 font-light max-w-xl mx-auto leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <button
            onClick={() => scrollTo('contact')}
            className="px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-lg"
          >
            {siteData.cta.button}
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
