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
          <div className="bg-card rounded-3xl p-10 md:p-16 shadow-lg border border-primary/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Package className="size-6 text-primary" />
              </div>
              <p className="text-sm font-semibold tracking-widest uppercase text-primary">
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
                  <CheckCircle className="size-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="https://krs-signature.de/auth?src=jan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-lg shadow-lg inline-block"
            >
              {siteData.leadMagnet.button}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
