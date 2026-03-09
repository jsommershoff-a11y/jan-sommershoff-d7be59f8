import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { siteData } from '@/data/siteData';
import { User, Heart, Baby, GraduationCap, MapPin } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  User, Heart, Baby, GraduationCap, MapPin,
};

export function PersonalFactsSection() {
  return (
    <section className="py-14 md:py-18 px-6 lg:px-8 bg-muted">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-center text-sm font-semibold tracking-widest uppercase text-primary mb-10">
            Auf einen Blick
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
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
      </div>
    </section>
  );
}
