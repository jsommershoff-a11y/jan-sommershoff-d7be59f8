import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Instagram, ArrowRight } from 'lucide-react';
import { siteData } from '@/data/siteData';

import post1 from '@/assets/instagram-post-1.jpg';
import post2 from '@/assets/instagram-post-2.jpg';
import post3 from '@/assets/instagram-post-3.jpg';
import post4 from '@/assets/instagram-post-4.jpg';

const posts = [
  { src: post1, alt: 'Unternehmer-Portrait' },
  { src: post2, alt: 'Immobilienprojekt' },
  { src: post3, alt: 'KI & Datenanalyse' },
  { src: post4, alt: 'Familie & Alltag' },
];

export function InstagramSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <Instagram className="size-8 md:size-10 text-primary mx-auto mb-4 md:mb-6" />
          <h2 className="text-xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
            Folge meinem Weg auf Instagram
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto mb-8 md:mb-10 leading-relaxed">
            Einblicke in meinen Alltag als Unternehmer und Familienvater – echte Gedanken, keine Hochglanz-Fassade.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <a
            href={siteData.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-8 md:mb-10 group"
          >
            {posts.map((post, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-lg md:rounded-lg relative"
              >
                <img
                  src={post.src}
                  alt={post.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
              </div>
            ))}
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <a
            href={siteData.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3.5 md:py-4 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white font-bold text-sm md:text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <Instagram className="size-4 md:size-5" />
            <span>@jan_sommershoff folgen</span>
            <ArrowRight className="size-3.5 md:size-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
