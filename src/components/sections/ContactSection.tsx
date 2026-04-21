import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteData } from '@/data/siteData';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Send, Loader2, CheckCircle, Linkedin, Instagram, Youtube, Podcast } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/tracking';

export function ContactSection() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    if (!form.first_name.trim() || !form.last_name.trim()) {
      toast.error('Bitte Vor- und Nachnamen angeben.');
      return;
    }
    if (!/^[+\d][\d\s\-/().]{3,49}$/.test(form.phone.trim())) {
      toast.error('Bitte eine gültige Telefonnummer angeben.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          type: 'contact',
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message,
        },
      });

      if (error) throw error;
      if ((data as { error?: string })?.error) {
        throw new Error((data as { error: string }).error);
      }

      trackEvent('contact_submit', { funnel: 'potenzialanalyse' });
      setForm({ first_name: '', last_name: '', email: '', phone: '', message: '' });
      // Redirect zur Danke-Seite (feuert Conversion-Event automatisch)
      navigate('/danke/kontakt');
      return;
    } catch (error: unknown) {
      console.error('Submit error:', error);
      const msg = error instanceof Error ? error.message : 'Fehler beim Senden. Bitte versuche es erneut.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-32 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
            <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-primary">
              Kontakt
            </p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
              Lass uns sprechen
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <ScrollReveal delay={0.1}>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
                <CheckCircle className="size-16 text-primary" />
                <h3 className="text-2xl font-semibold text-foreground">Nachricht eingegangen!</h3>
                <p className="text-muted-foreground">
                  Wir haben dir gerade eine Bestätigungsmail geschickt. Erst nach Klick auf den Bestätigungslink erhältst du den Zugang zur Potenzialanalyse.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">Vorname *</Label>
                    <Input
                      id="first_name"
                      placeholder="Max"
                      autoComplete="given-name"
                      value={form.first_name}
                      onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                      required
                      maxLength={100}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Nachname *</Label>
                    <Input
                      id="last_name"
                      placeholder="Mustermann"
                      autoComplete="family-name"
                      value={form.last_name}
                      onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                      required
                      maxLength={100}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="deine@email.de"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    maxLength={255}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+49 170 1234567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                    maxLength={50}
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
                    maxLength={5000}
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
