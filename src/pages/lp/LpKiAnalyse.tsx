import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { trackConversion } from '@/lib/tracking';

/**
 * Kampagnen-Landingpage: /lp/ki-analyse
 * Für Ads-Traffic — eigenständige minimalistische LP ohne Header/Footer.
 */
export default function LpKiAnalyse() {
  useEffect(() => {
    trackConversion('lp_view', 'ViewContent', { content_name: 'LP KI-Analyse' });
  }, []);

  const benefits = [
    'Konkrete KI-Use-Cases für dein Unternehmen',
    'Roadmap für die ersten 90 Tage',
    'Kosten- und ROI-Einschätzung',
    'Risiken & Datenschutz-Check',
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-28">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
          <Sparkles className="size-4" /> KI System Analyse
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          In 60 Minuten zur klaren KI-Roadmap.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
          Wir analysieren dein Unternehmen, identifizieren die größten
          Automatisierungs-Hebel und liefern dir einen konkreten Umsetzungsplan.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-10 max-w-2xl">
          {benefits.map((b) => (
            <div key={b} className="flex items-start gap-3">
              <CheckCircle2 className="size-5 text-primary mt-0.5 shrink-0" />
              <span className="text-sm md:text-base">{b}</span>
            </div>
          ))}
        </div>

        <Link
          to="/upsell"
          onClick={() => trackConversion('lp_cta_click', 'Lead', { content_name: 'LP KI-Analyse' })}
          className="inline-flex items-center justify-center gap-2 px-8 h-14 bg-accent text-white font-bold rounded-md hover:opacity-90 transition shadow-lg"
        >
          Jetzt Analyse sichern
          <ArrowRight className="size-5" />
        </Link>
      </section>
    </main>
  );
}
