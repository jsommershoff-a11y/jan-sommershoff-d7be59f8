import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Send, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { trackConversion, trackEvent, trackPageView, gtagSendEventAndNavigate } from '@/lib/tracking';
import { siteData } from '@/data/siteData';

type Ziel = 'notfallkoffer' | 'potenzialanalyse';

const ZIELE: Record<Ziel, {
  badge: string;
  headline: string;
  subline: string;
  submitLabel: string;
  successTitle: string;
  conversionEvent: string;
  metaEvent: 'Lead' | 'Contact';
}> = {
  notfallkoffer: {
    badge: 'KI Notfallkoffer · Kostenlos',
    headline: 'KI Notfallkoffer anfordern',
    subline:
      'Sichere dir Sofort-Hilfe für die häufigsten KI- und Automatisierungs-Fragen im Unternehmen. Wir senden dir den Notfallkoffer persönlich zu.',
    submitLabel: 'Notfallkoffer anfordern',
    successTitle: 'Notfallkoffer angefordert',
    conversionEvent: 'lead_submit_notfallkoffer',
    metaEvent: 'Lead',
  },
  potenzialanalyse: {
    badge: 'Potenzialanalyse · Kostenfrei',
    headline: 'Potenzialanalyse anfragen',
    subline:
      'Wir analysieren deine Prozesse und zeigen dir, wo KI und Automatisierung sofort Wirkung zeigen. Innerhalb von 24h melden wir uns persönlich.',
    submitLabel: 'Analyse anfragen',
    successTitle: 'Anfrage erhalten',
    conversionEvent: 'lead_submit_potenzialanalyse',
    metaEvent: 'Lead',
  },
};

function parseZiel(raw: string | null): Ziel {
  return raw === 'notfallkoffer' ? 'notfallkoffer' : 'potenzialanalyse';
}

export default function Kontakt() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const ziel = useMemo(() => parseZiel(params.get('ziel')), [params]);
  const config = ZIELE[ziel];

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    trackPageView(`/kontakt?ziel=${ziel}`, config.headline);
    trackEvent('kontakt_view', { ziel });
  }, [ziel, config.headline]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name.trim() || !form.last_name.trim()) {
      toast.error('Bitte Vor- und Nachnamen angeben.');
      return;
    }
    if (!/^[+\d][\d\s\-/().]{3,49}$/.test(form.phone.trim())) {
      toast.error('Bitte eine gültige Telefonnummer angeben.');
      return;
    }
    if (!acceptedPrivacy) {
      toast.error('Bitte stimme der Datenschutzerklärung zu.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          type: ziel === 'notfallkoffer' ? 'lead_magnet' : 'contact',
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          name: `${form.first_name.trim()} ${form.last_name.trim()}`,
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim() || (ziel === 'notfallkoffer' ? 'KI Notfallkoffer angefordert' : 'Potenzialanalyse angefragt'),
          source: ziel,
        },
      });
      if (error) throw error;
      if ((data as { error?: string })?.error) {
        throw new Error((data as { error: string }).error);
      }

      // Form-Felder als GA4/Ads-Eventparameter mappen.
      const conversionParams = {
        event_category: 'lead',
        event_label: ziel,                          // 'potenzialanalyse' | 'notfallkoffer'
        lead_type: ziel === 'notfallkoffer' ? 'lead_magnet' : 'contact',
        form_id: 'kontakt',
        ziel,
        has_message: form.message.trim().length > 0,
        has_phone: form.phone.trim().length > 0,
      };

      // An die Danke-Seite weitergeben, damit conversion_event_page_view
      // dort dieselben Parameter erhält.
      try {
        sessionStorage.setItem(
          'conversion_params',
          JSON.stringify(conversionParams),
        );
      } catch { /* ignore */ }

      // GA4-Conversion mit verzögerter Navigation: wartet auf event_callback
      // (max. 2s), damit das Event sicher bei GA4 ankommt, bevor wir routen.
      // Meta Lead/CompleteRegistration werden zentral vom MetaPixelRouterTracker
      // auf /danke/kontakt bzw. /danke/lead gefeuert (sessionStorage-dedupliziert).
      gtagSendEventAndNavigate(
        config.conversionEvent,
        `/danke/kontakt?ziel=${ziel}`,
        { params: conversionParams, onNavigate: (url) => navigate(url) }
      );
    } catch (error: unknown) {
      console.error('Submit error:', error);
      const msg = error instanceof Error ? error.message : 'Fehler beim Senden. Bitte versuche es erneut.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title={`${config.headline} – Jan Sommershoff`}
        description={config.subline}
        canonicalPath={`/kontakt?ziel=${ziel}`}
        noIndex
      />
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 min-h-11 py-2"
          >
            <ArrowLeft className="size-4" />
            Zurück zur Startseite
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3 mb-8"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">
              {config.badge}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
              {config.headline}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {config.subline}
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-5 md:p-8 shadow-sm space-y-5"
          >
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
                  className="h-12 text-base"
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
                  className="h-12 text-base"
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
                className="h-12 text-base"
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
                className="h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">
                Nachricht <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Textarea
                id="message"
                placeholder={
                  ziel === 'notfallkoffer'
                    ? 'Worum geht es bei dir gerade? (optional)'
                    : 'Was sind deine größten Herausforderungen?'
                }
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={5000}
                disabled={isSubmitting}
              />
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3">
              <input
                id="privacy"
                type="checkbox"
                checked={acceptedPrivacy}
                onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                disabled={isSubmitting}
                required
                className="mt-1 size-4 rounded border-border accent-primary cursor-pointer shrink-0"
              />
              <label htmlFor="privacy" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                Ich habe die{' '}
                <Link to="/datenschutz" target="_blank" className="text-accent underline hover:text-foreground">
                  Datenschutzerklärung
                </Link>{' '}
                gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu. *
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !acceptedPrivacy}
              className="w-full inline-flex items-center justify-center gap-2 px-6 h-14 bg-accent text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
            >
              {isSubmitting ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <>
                  <Send className="size-4" />
                  {config.submitLabel}
                </>
              )}
            </button>

            <p className="flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-primary shrink-0 mt-0.5" />
              <span>
                Deine Daten werden ausschließlich zur Bearbeitung deiner Anfrage genutzt.
                Mehr in der{' '}
                <Link to="/datenschutz" className="underline hover:text-foreground">
                  Datenschutzerklärung
                </Link>
                .
              </span>
            </p>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 grid sm:grid-cols-2 gap-4"
          >
            <a
              href={`mailto:${siteData.email}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 transition-colors text-sm"
            >
              <Mail className="size-5 text-primary" />
              <span className="text-foreground">{siteData.email}</span>
            </a>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border text-sm">
              <MapPin className="size-5 text-primary" />
              <span className="text-foreground">{siteData.location}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
