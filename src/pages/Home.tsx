import { motion } from 'framer-motion';
import { siteData } from '@/data/siteData';
import heroImage from '@/assets/hero-jan.jpeg';
import aboutImage from '@/assets/about-jan.jpeg';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { Building2, Brain, Rocket, Building, Monitor, ArrowRight, Mail, MapPin, Quote } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Building2, Brain, Rocket, Building, Monitor,
};

export default function Home() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead
        title="Jan Sommershoff – Immobilien, KI & Unternehmertum"
        description="Strategien für Immobilien-Investment, KI-Leverage und modernen Vermögensaufbau. Für Menschen, die mehr wollen."
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Jan Sommershoff auf der Bühne"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          </div>

          <div className="relative h-full flex items-center px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full">
              <motion.div
                className="max-w-2xl space-y-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <motion.h1
                  className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {siteData.heroHeadline}
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {siteData.heroSubheadline}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <button
                    onClick={() => scrollTo('expertise')}
                    className="px-8 py-4 bg-accent text-accent-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Strategien entdecken
                  </button>
                  <button
                    onClick={() => scrollTo('contact')}
                    className="px-8 py-4 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Kontakt aufnehmen
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 md:py-32 px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <p className="text-sm font-semibold tracking-widest uppercase text-accent">Über mich</p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    Unternehmer. Investor. Stratege.
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">{siteData.about.intro}</p>
                  <p className="text-base text-muted-foreground leading-relaxed">{siteData.about.text}</p>
                  <p className="text-base text-muted-foreground leading-relaxed">{siteData.about.text2}</p>
                </div>
                <div className="relative">
                  <img
                    src={aboutImage}
                    alt="Jan Sommershoff"
                    className="w-full rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/10 rounded-2xl -z-10" />
                  <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent/5 rounded-2xl -z-10" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className="py-24 md:py-32 px-6 lg:px-8 bg-muted">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16 space-y-4">
                <p className="text-sm font-semibold tracking-widest uppercase text-accent">Expertise</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  Was ich mache
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
                      <h3 className="text-xl font-semibold text-card-foreground mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16 space-y-4">
                <p className="text-sm font-semibold tracking-widest uppercase text-accent">Insights</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  Gedanken & Überzeugungen
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {siteData.quotes.map((quote, index) => (
                <ScrollReveal key={index} delay={index * 0.15}>
                  <div className="relative p-8 bg-card rounded-2xl border-l-4 border-accent shadow-sm">
                    <Quote className="size-8 text-accent/20 absolute top-6 right-6" />
                    <p className="text-lg text-card-foreground leading-relaxed mb-4 italic">
                      „{quote.text}"
                    </p>
                    <p className="text-sm font-medium text-muted-foreground">— {quote.author}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 md:py-32 px-6 lg:px-8 bg-muted">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16 space-y-4">
                <p className="text-sm font-semibold tracking-widest uppercase text-accent">Projekte</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  Unternehmen & Projekte
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {siteData.projects.map((project, index) => {
                const Icon = iconMap[project.icon];
                return (
                  <ScrollReveal key={project.name} delay={index * 0.15}>
                    <div className="group bg-card p-10 rounded-2xl shadow-sm border border-border hover:shadow-lg transition-all duration-300">
                      <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                        {Icon && <Icon className="size-8 text-accent" />}
                      </div>
                      <h3 className="text-2xl font-bold text-card-foreground mb-3">{project.name}</h3>
                      <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                      <div className="mt-6 flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
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

        {/* CTA Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-foreground">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-background">
                Der nächste Schritt liegt bei dir.
              </h2>
              <p className="text-lg text-background/70 font-light max-w-xl mx-auto">
                Bereit, mehr aus deinem Leben zu machen? Lass uns in Kontakt treten.
              </p>
              <button
                onClick={() => scrollTo('contact')}
                className="px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-lg"
              >
                Jetzt verbinden
              </button>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32 px-6 lg:px-8 bg-background">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <ScrollReveal>
              <p className="text-sm font-semibold tracking-widest uppercase text-accent">Kontakt</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Lass uns sprechen
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4">
                <a
                  href={`mailto:${siteData.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors"
                >
                  <Mail className="size-5" />
                  <span>{siteData.email}</span>
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="size-5" />
                  <span>{siteData.location}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
}
