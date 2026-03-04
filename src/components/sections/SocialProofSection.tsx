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
    <section className="py-16 md:py-20 px-6 lg:px-8 bg-[#0F3D2E]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div className="flex items-center">
                <div className="text-center space-y-2 px-6 md:px-10 py-4">
                  <stat.icon className="size-6 text-accent mx-auto mb-3" />
                  <p className="text-4xl md:text-5xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/70 font-medium">
                    {stat.label}
                  </p>
                </div>
                {index < stats.length - 1 && (
                  <div className="hidden md:block w-px h-16 bg-white/20" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
