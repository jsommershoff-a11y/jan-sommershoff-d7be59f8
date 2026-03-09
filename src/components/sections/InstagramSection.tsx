import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Instagram, ArrowRight } from 'lucide-react';
import { siteData } from '@/data/siteData';

export function InstagramSection() {
  return (
    <section className="py-20 md:py-24 px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <Instagram className="size-10 text-primary mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Folge meinem Weg auf Instagram
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
            Einblicke in meinen Alltag als Unternehmer und Familienvater – echte Gedanken, keine Hochglanz-Fassade.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <a
            href={siteData.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <Instagram className="size-5" />
            <span>@jan_sommershoff folgen</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
