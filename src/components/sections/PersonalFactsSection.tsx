import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { siteData } from '@/data/siteData';
import { User, Heart, Baby, GraduationCap, MapPin } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  User, Heart, Baby, GraduationCap, MapPin,
};

export function PersonalFactsSection() {
  return (
    <section className="py-12 md:py-18 px-4 md:px-6 lg:px-8 bg-muted">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-center text-sm font-semibold tracking-widest uppercase text-primary mb-8 md:mb-10">
            Auf einen Blick
          </p>
        </ScrollReveal>

        {/* Mobile: horizontal scroll strip, Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-5 gap-4">
          {siteData.personalFacts.map((fact, i) => {
            const Icon = iconMap[fact.icon] || User;
            return (
              <ScrollReveal key={fact.label} delay={i * 0.08}>
                <div className="text-center space-y-2 py-4">
                  <Icon className="size-6 text-primary mx-auto" />
                  <p className="text-base font-bold text-foreground">{fact.label}</p>
                  <p className="text-xs text-muted-foreground">{fact.detail}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Mobile: 2-column grid with last item centered */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {siteData.personalFacts.map((fact, i) => {
            const Icon = iconMap[fact.icon] || User;
            const isLast = i === siteData.personalFacts.length - 1;
            const isOddTotal = siteData.personalFacts.length % 2 === 1;
            return (
              <ScrollReveal
                key={fact.label}
                delay={i * 0.06}
              >
                <div
                  className={`text-center space-y-1.5 py-4 px-2 rounded-xl bg-card border border-border ${
                    isLast && isOddTotal ? 'col-span-2 max-w-[50%] mx-auto' : ''
                  }`}
                >
                  <Icon className="size-5 text-primary mx-auto" />
                  <p className="text-sm font-bold text-foreground leading-tight">{fact.label}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">{fact.detail}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
