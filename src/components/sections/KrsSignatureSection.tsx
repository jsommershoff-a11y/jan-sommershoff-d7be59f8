import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Search, Bot, TrendingUp, ArrowRight } from 'lucide-react';
import visualKrs from '@/assets/visual-krs-signature.jpg';

const pillars = [
  {
    icon: Search,
    title: 'Prozess-Audit',
    text: 'Wir analysieren deine Engpässe und identifizieren die größten Hebel für sofortige Verbesserungen.',
  },
  {
    icon: Bot,
    title: 'KI & Automatisierung',
    text: 'Wir implementieren Systeme, die dir sofort Zeit sparen – CRM, Rechnungsstellung, Lead-Management.',
  },
  {
    icon: TrendingUp,
    title: 'Struktur & Skalierung',
    text: 'Dein Unternehmen wird unabhängig von deiner operativen Arbeitskraft – skalierbar und stabil.',
  },
];

export function KrsSignatureSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-32 px-6 lg:px-8 bg-muted">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
              Die Lösung
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Operative Exzellenz durch
              <span className="text-primary"> KRS Signature.</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Done-with-you oder Done-for-you – wir setzen um, damit du dich auf das Wesentliche konzentrieren kannst.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {pillars.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 h-full text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <p.icon className="size-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://krs-signature.de"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all shadow-[0_4px_30px_rgba(15,61,46,0.4)] hover:shadow-[0_8px_40px_rgba(15,61,46,0.5)] hover:-translate-y-1 duration-300"
            >
              Erfahre mehr über KRS Signature
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/5 transition-all duration-300"
            >
              Erstgespräch sichern
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
