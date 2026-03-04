import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Building2, Users, Brain, TrendingUp, UsersRound } from 'lucide-react';

const stats = [
  { value: '5+', label: 'Jahre Unternehmertum', icon: TrendingUp },
  { value: '50+', label: 'Immobilienprojekte', icon: Building2 },
  { value: '100+', label: 'KI Systeme implementiert', icon: Brain },
  { value: '10+', label: 'Unternehmer begleitet', icon: Users },
  { value: '50+', label: 'Mitarbeiter in Spitzenzeiten', icon: UsersRound },
];

export function SocialProofSection() {
  return (
    <section className="py-16 md:py-20 px-6 lg:px-8 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div className="text-center space-y-2">
                <stat.icon className="size-6 text-accent mx-auto mb-3" />
                <p className="text-3xl md:text-4xl font-bold text-primary-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-primary-foreground/70 font-medium">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
