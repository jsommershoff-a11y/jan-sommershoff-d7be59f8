import { useState } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CheckCircle, Package, Loader2, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function LeadMagnetSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          type: 'lead_magnet',
          name: 'Lead Magnet Anfrage',
          email: email.trim(),
          message: 'KI-Notfallkoffer angefordert',
        },
      });
      if (error) throw error;
      setIsSuccess(true);
      setEmail('');
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
    'Ein Entscheidungs-Framework für schwierige Situationen',
  ];

  return (
    <section id="lead-magnet" className="py-24 md:py-32 px-6 lg:px-8 bg-muted">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="bg-card rounded-3xl p-10 md:p-16 shadow-lg border border-primary/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Package className="size-6 text-primary" />
              </div>
              <p className="text-sm font-semibold tracking-widest uppercase text-primary">
                Kostenlos
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Der KI-Notfallkoffer für Unternehmer.
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Hol dir 10 KI Prompts und 3 Automatisierungs-Workflows, die du heute noch implementieren kannst.
            </p>

            <div className="space-y-4 mb-10">
              {items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="size-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
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
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  required
                  placeholder="Deine E-Mail-Adresse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-14 text-base px-5"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center justify-center gap-2 px-8 h-14 bg-accent text-white font-bold rounded-md hover:opacity-90 transition-all shadow-lg disabled:opacity-60"
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
