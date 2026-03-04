import { useState } from 'react';
import { siteData } from '@/data/siteData';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CheckCircle, Package, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function LeadMagnetSection() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          type: 'lead_magnet',
          name: form.name,
          email: form.email,
          message: 'KI-Notfallkoffer angefordert',
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      setForm({ name: '', email: '' });
      toast.success('Anfrage erfolgreich gesendet! Du hörst bald von uns.');
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Fehler beim Senden. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-magnet" className="py-24 md:py-32 px-6 lg:px-8 bg-muted">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="bg-card rounded-3xl p-10 md:p-16 shadow-lg border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Package className="size-6 text-accent" />
              </div>
              <p className="text-sm font-semibold tracking-widest uppercase text-accent">
                Kostenlos
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8">
              {siteData.leadMagnet.headline}
            </h2>

            <div className="space-y-4 mb-10">
              {siteData.leadMagnet.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="space-y-4 mb-10">
              {siteData.leadMagnet.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="size-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>

            {isSuccess ? (
              <div className="flex items-center gap-3 p-4 bg-green-500/10 rounded-lg">
                <CheckCircle className="size-6 text-green-500 shrink-0" />
                <p className="text-foreground font-medium">
                  Vielen Dank! Du erhältst den KI-Notfallkoffer in Kürze per E-Mail.
                </p>
              </div>
            ) : showForm ? (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="lead-name">Name</Label>
                  <Input
                    id="lead-name"
                    placeholder="Dein Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-email">E-Mail</Label>
                  <Input
                    id="lead-email"
                    type="email"
                    placeholder="deine@email.de"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    'Jetzt anfordern'
                  )}
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-lg"
              >
                {siteData.leadMagnet.button}
              </button>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
