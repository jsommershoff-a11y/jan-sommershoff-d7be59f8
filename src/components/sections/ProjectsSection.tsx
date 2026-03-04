import { siteData } from '@/data/siteData';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Building, Monitor, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = { Building, Monitor };

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary">
              Projekte
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Projekte
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {siteData.projects.map((project, index) => {
            const Icon = iconMap[project.icon];
            return (
              <ScrollReveal key={project.name} delay={index * 0.15}>
                <div className="group bg-card p-10 rounded-2xl shadow-sm border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    {Icon && <Icon className="size-8 text-accent" />}
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-3">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    <span>Mehr erfahren</span>
                    <ArrowRight className="size-4" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
