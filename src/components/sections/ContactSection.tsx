import { useState } from 'react';
import { siteData } from '@/data/siteData';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Send } from 'lucide-react';

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Anfrage von ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${siteData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm font-semibold tracking-widest uppercase text-accent">
              Kontakt
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Lass uns sprechen
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-16">
          <ScrollReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Dein Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="deine@email.de"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Nachricht</Label>
                <Textarea
                  id="message"
                  placeholder="Wie kann ich dir helfen?"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                <Send className="size-4" />
                Nachricht senden
              </button>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-8 md:pt-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Direkt erreichen
                </h3>
                <div className="space-y-4">
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
              </div>

              <div className="p-6 bg-muted rounded-2xl">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  „Der Unterschied zwischen dauerhaftem Erfolg und dauerhaftem Chaos
                  liegt selten im Talent. Er liegt fast immer in Struktur, Systemen
                  und den Entscheidungen, die man in schwierigen Momenten trifft."
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
