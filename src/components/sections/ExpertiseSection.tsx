import { siteData } from '@/data/siteData';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Building2, Brain, Rocket } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = { Building2, Brain, Rocket };

export function ExpertiseSection() {
  return (
    <section id="expertise" className="py-24 md:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm font-semibold tracking-widest uppercase text-accent">
              Expertise
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Meine Arbeitsbereiche
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {siteData.expertise.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <ScrollReveal key={item.title} delay={index * 0.15}>
                <div className="group bg-card p-8 rounded-2xl shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    {Icon && <Icon className="size-7 text-accent" />}
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
