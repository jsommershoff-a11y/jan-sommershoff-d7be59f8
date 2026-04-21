import { siteData } from '@/data/siteData';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Link } from 'react-router-dom';
import { Building, Monitor, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = { Building, Monitor };

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-32 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
            <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-primary">
              Projekte
            </p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
              Projekte
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-xl mx-auto">
          {siteData.projects.map((project, index) => {
            const Icon = iconMap[project.icon];
            return (
              <ScrollReveal key={project.name} delay={index * 0.15} className="h-full [&>div]:h-full">
                <div className="h-full">
                  <Link
                    to="/kontakt?ziel=potenzialanalyse"
                    className="group flex flex-col h-full bg-card p-6 md:p-10 rounded-2xl shadow-sm border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors">
                      {Icon && <Icon className="size-7 md:size-8 text-accent" />}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-2 md:mb-3">
                      {project.name}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1">
                      {project.description}
                    </p>
                    <div className="mt-4 md:mt-6 inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      <span>Mehr erfahren</span>
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
