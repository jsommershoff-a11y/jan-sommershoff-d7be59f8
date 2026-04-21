import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, CheckCircle2 } from 'lucide-react';
import { LeadMagnetSection } from '@/components/sections/LeadMagnetSection';
import { trackConversion } from '@/lib/tracking';

/**
 * Kampagnen-Landingpage: /lp/notfallkoffer
 * Für Ads-Traffic — fokussiert nur auf den Lead-Magneten.
 */
export default function LpNotfallkoffer() {
  // Side-effect: trackConversion on mount
  useEffect(() => {
    trackConversion('lp_view', 'ViewContent', { content_name: 'LP Notfallkoffer' });
  }, []);

  const _ = useNavigate; // keep import (future use)
  const items = ['10 KI-Prompts', '3 Automations-Workflows', 'Entscheidungs-Framework'];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
          <Package className="size-4" /> Kostenlos
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Der KI-Notfallkoffer für Unternehmer.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Sofort einsetzbare Prompts, Workflows und ein klares Entscheidungs-Framework — gratis.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-foreground">
          {items.map((i) => (
            <span key={i} className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" /> {i}
            </span>
          ))}
        </div>
      </section>
      <LeadMagnetSection />
    </main>
  );
}
