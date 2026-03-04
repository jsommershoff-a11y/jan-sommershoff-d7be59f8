import { siteData } from '@/data/siteData';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CheckCircle, Package } from 'lucide-react';

export function LeadMagnetSection() {
  const handleClick = () => {
    const subject = encodeURIComponent('KI Notfallkoffer anfordern');
    const body = encodeURIComponent(
      'Hallo Jan,\n\nich möchte den KI-Notfallkoffer für Unternehmer anfordern.\n\nViele Grüße'
    );
    window.location.href = `mailto:${siteData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="lead-magnet" className="py-24 md:py-32 px-6 lg:px-8 bg-muted">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="bg-card rounded-3xl p-10 md:p-16 shadow-lg border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Package className="size-6 text-accent" />
              </div>
              <p className="text-sm font-semibold tracking-widest uppercase text-accent">
                Kostenlos
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8">
              {siteData.leadMagnet.headline}
            </h2>

            <div className="space-y-4 mb-10">
              {siteData.leadMagnet.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="space-y-4 mb-10">
              {siteData.leadMagnet.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="size-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleClick}
              className="px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-lg"
            >
              {siteData.leadMagnet.button}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
