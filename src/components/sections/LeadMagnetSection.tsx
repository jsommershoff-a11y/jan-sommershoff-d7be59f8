import { useState } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CheckCircle, Package, Loader2, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function LeadMagnetSection() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) return;
    setIsSubmitting(true);

    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          type: 'lead_magnet',
          name: fullName,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: 'KI-Notfallkoffer angefordert',
        },
      });
      if (error) throw error;
      setIsSuccess(true);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      toast.success('Anfrage erfolgreich! Du hörst bald von uns.');
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Fehler beim Senden. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const items = [
    '10 KI Prompts für Unternehmer',
    '3 Automatisierungs-Workflows',
    'Ein Entscheidungs-Framework für strategische Entscheidungen',
  ];

  return (
    <section id="lead-magnet" className="py-16 md:py-32 px-4 md:px-6 lg:px-8 bg-muted">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-16 shadow-lg border border-primary/10">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Package className="size-5 md:size-6 text-primary" />
              </div>
              <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-primary">
                Kostenlos
              </p>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground mb-3 md:mb-4">
              Der KI-Notfallkoffer für Unternehmer.
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-8">
              Hol dir 10 KI Prompts und 3 Automatisierungs-Workflows, die du heute noch implementieren kannst.
            </p>

            <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
              {items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="size-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm md:text-base text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>

            {isSuccess ? (
              <div className="bg-primary/10 rounded-xl p-6 text-center">
                <CheckCircle className="size-8 text-primary mx-auto mb-3" />
                <p className="text-lg font-semibold text-foreground">Anfrage erhalten!</p>
                <p className="text-muted-foreground mt-1">Wir melden uns in Kürze bei dir.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lm-first-name">Vorname *</Label>
                    <Input
                      id="lm-first-name"
                      type="text"
                      required
                      minLength={1}
                      maxLength={100}
                      placeholder="Max"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="h-12 text-base px-4"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lm-last-name">Nachname *</Label>
                    <Input
                      id="lm-last-name"
                      type="text"
                      required
                      minLength={1}
                      maxLength={100}
                      placeholder="Mustermann"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="h-12 text-base px-4"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lm-email">E-Mail *</Label>
                    <Input
                      id="lm-email"
                      type="email"
                      required
                      maxLength={255}
                      placeholder="deine@email.de"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-base px-4"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lm-phone">Telefon *</Label>
                    <Input
                      id="lm-phone"
                      type="tel"
                      required
                      minLength={4}
                      maxLength={50}
                      placeholder="+49 170 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-12 text-base px-4"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full inline-flex items-center justify-center gap-2 px-8 h-14 bg-accent text-white font-bold rounded-md hover:opacity-90 transition-all shadow-lg disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <>
                      Jetzt kostenlos anfordern
                      <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
