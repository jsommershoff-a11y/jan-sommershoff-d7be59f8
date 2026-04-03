import { useState } from 'react';
import { siteData } from '@/data/siteData';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Send, Loader2, CheckCircle, Linkedin, Instagram, Youtube, Podcast } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          type: 'contact',
          name: form.name,
          email: form.email,
          message: form.message,
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      setForm({ name: '', email: '', message: '' });
      toast.success('Nachricht erfolgreich gesendet!');
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Fehler beim Senden. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary">
              Kontakt
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Lass uns sprechen
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-16">
          <ScrollReveal delay={0.1}>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
                <CheckCircle className="size-16 text-primary" />
                <h3 className="text-2xl font-semibold text-foreground">Nachricht gesendet!</h3>
                <p className="text-muted-foreground">
                  Vielen Dank für deine Nachricht. Ich melde mich schnellstmöglich.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Dein Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg"
                >
                  {isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                  {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
                </button>
              </form>
            )}
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
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
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

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Social Media
                </h3>
                <div className="flex items-start gap-5">
                  {siteData.socialLinks.linkedin && (
                    <a href={siteData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                      <Linkedin className="size-5" />
                    </a>
                  )}
                  {siteData.socialLinks.instagram && (
                    <a href={siteData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                      <Instagram className="size-5" />
                    </a>
                  )}
                  <div className="flex flex-col items-center gap-1">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                      <Youtube className="size-5" />
                    </a>
                    <span className="text-[10px] text-muted-foreground/60">Coming soon</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Podcast">
                      <Podcast className="size-5" />
                    </a>
                    <span className="text-[10px] text-muted-foreground/60">Coming soon</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  „Der Unterschied zwischen dauerhaftem Erfolg und dauerhaftem Chaos
                  liegt selten im Talent. Er liegt fast immer in Struktur, Systemen
                  und den Entscheidungen, die man in entscheidenden Momenten trifft."
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
