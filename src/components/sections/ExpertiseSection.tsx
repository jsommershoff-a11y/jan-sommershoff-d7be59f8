import { siteData } from '@/data/siteData';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Building2, Brain, Rocket } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = { Building2, Brain, Rocket };

export function ExpertiseSection() {
  return (
    <section id="expertise" className="py-16 md:py-32 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
            <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-primary">
              Expertise
            </p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
              Meine Arbeitsbereiche
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {siteData.expertise.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <ScrollReveal key={item.title} delay={index * 0.15}>
                <div className="group bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 transition-all duration-300">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors">
                    {Icon && <Icon className="size-6 md:size-7 text-accent" />}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-card-foreground mb-2 md:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
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
