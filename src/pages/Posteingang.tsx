import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Loader2,
  Send,
  ShieldCheck,
  FileText,
  Brain,
  Workflow,
  ArrowRight,
  CheckCircle2,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { trackConversion, trackEvent, trackPageView, gtagSendEventAndNavigate } from '@/lib/tracking';

const CANONICAL_PATH = '/posteingang';
const SITE_URL = 'https://dein-automatisierungsberater.de';

const PILLARS = [
  {
    icon: FileText,
    title: 'OCR + Volltext-Indexierung',
    description:
      'Jeder eingehende Brief wird gescannt, per OCR in Text umgewandelt und in einem durchsuchbaren Volltextindex abgelegt.',
  },
  {
    icon: Brain,
    title: 'KI-Klassifikation + Routing',
    description:
      'Künstliche Intelligenz erkennt Absender, Dokumenttyp und Priorität und leitet jedes Dokument automatisch an die zuständige Stelle oder das zuständige System weiter.',
  },
  {
    icon: Workflow,
    title: 'Prozess-Implementierung',
    description:
      'Wir integrieren den automatisierten Posteingang in Ihre bestehenden Tools (DMS, CRM, ERP, Mail, Drive, SharePoint) und übernehmen die komplette Einführung.',
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Erstgespräch & Ist-Analyse',
    description:
      'Wir klären Postvolumen, Dokumenttypen, Zielsysteme und bestehende Abläufe. Kostenfrei, unverbindlich.',
  },
  {
    number: '02',
    title: 'Prozessdesign & Angebot',
    description:
      'Sie erhalten einen konkreten Implementierungsplan inklusive Aufwand, Ergebnis und Kosten.',
  },
  {
    number: '03',
    title: 'Einrichtung & Integration',
    description:
      'OCR-Pipeline, KI-Klassifikation und Routing werden konfiguriert, an Ihre Systeme angebunden und getestet.',
  },
  {
    number: '04',
    title: 'Go-live & Betrieb',
    description:
      'Schulung, Betriebshandbuch und laufende Optimierung. Der automatisierte Posteingang läuft produktiv.',
  },
];

const BENEFITS = [
  'Jeder Brief digital, durchsuchbar und zugeordnet statt manuell sortiert.',
  'Absender, Dokumenttyp und Priorität werden automatisch erkannt.',
  'Direkte Weitergabe an Buchhaltung, Kundendienst, Rechtsabteilung oder Geschäftsführung.',
  'DSGVO-konforme Verarbeitung, Daten in deutschen und europäischen Rechenzentren.',
  'Integration in bestehende Systeme – ohne Werkzeugwechsel für Ihr Team.',
  'Messbare Zeitersparnis ab dem ersten Monat.',
];

const FAQ = [
  {
    question: 'Was kostet die Briefpost-Automatisierung?',
    answer:
      'Die Kosten hängen vom Postvolumen, den Dokumenttypen und den Zielsystemen ab. Nach einem kostenfreien Erstgespräch erhalten Sie ein konkretes Angebot mit Aufwand, Ergebnis und Preis. Preise auf Anfrage.',
  },
  {
    question: 'Wie schnell ist die Lösung produktiv?',
    answer:
      'Für Standard-Setups ist eine produktive Einführung in 2 bis 6 Wochen realistisch. Komplexe Integrationen mit mehreren Zielsystemen oder Sonderprozessen planen wir individuell.',
  },
  {
    question: 'Wie werden personenbezogene Daten geschützt (DSGVO)?',
    answer:
      'Alle Daten werden in deutschen beziehungsweise europäischen Rechenzentren verarbeitet. Wir schließen mit Ihnen einen Auftragsverarbeitungsvertrag (AV-Vertrag) und setzen technische und organisatorische Maßnahmen gemäß DSGVO um.',
  },
  {
    question: 'Welche Dokumenttypen kann die KI unterscheiden?',
    answer:
      'Unter anderem Rechnungen, Mahnungen, Verträge, Kündigungen, Behördenpost, Lieferscheine, Steuerunterlagen, Versicherungsschreiben und Kundenkorrespondenz. Die Klassifikation wird auf Ihre tatsächlichen Dokumenttypen trainiert.',
  },
  {
    question: 'Brauche ich spezielle Hardware?',
    answer:
      'Nein. Die Verarbeitung läuft cloud-basiert. Für die Digitalisierung genügt ein handelsüblicher Scanner oder ein Dokumenten-Einzug. Bei Bedarf empfehlen wir passende Hardware.',
  },
  {
    question: 'Was passiert bei unklaren Klassifikationen?',
    answer:
      'Dokumente mit niedriger Konfidenz werden in einer Prüfschicht zur manuellen Freigabe vorgehalten. Dadurch bleibt die Klassifikation stabil, und das System lernt aus jeder Korrektur.',
  },
  {
    question: 'Funktioniert das auch für handschriftliche Dokumente?',
    answer:
      'Moderne OCR-Modelle erfassen auch handschriftliche Inhalte mit hoher Qualität. Für reine Handschrift-Workflows prüfen wir im Erstgespräch die Machbarkeit im Einzelfall.',
  },
  {
    question: 'Für wen ist die Lösung geeignet?',
    answer:
      'Für Selbstständige und Einzelunternehmer mit hohem Postaufkommen, für KMU, die Buchhaltung, Rechtsabteilung oder Kundendienst entlasten wollen, sowie für Agenturen und Dienstleister, die Kunden-Post mit bearbeiten.',
  },
];

const MAIL_VOLUME_OPTIONS = [
  { value: 'unter-100', label: 'Unter 100 Poststücke / Monat' },
  { value: '100-500', label: '100 – 500 Poststücke / Monat' },
  { value: '500-2000', label: '500 – 2.000 Poststücke / Monat' },
  { value: '2000-10000', label: '2.000 – 10.000 Poststücke / Monat' },
  { value: 'ueber-10000', label: 'Über 10.000 Poststücke / Monat' },
];

/** Rich structured-data @graph for /posteingang. Includes Organization,
 * WebSite, Service, BreadcrumbList and FAQPage for rich SERP features. */
const POSTEINGANG_JSONLD: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'dein-automatisierungsberater.de',
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.png`,
      email: 'j.s@jan-sommershoff.de',
      areaServed: { '@type': 'Country', name: 'Deutschland' },
      founder: { '@type': 'Person', name: 'Jan Sommershoff' },
      sameAs: [
        'https://www.linkedin.com/in/jan-niklas-sommershoff-719787218',
        'https://www.instagram.com/jan_sommershoff/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'dein-automatisierungsberater.de',
      inLanguage: 'de-DE',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}${CANONICAL_PATH}#service`,
      serviceType: 'Briefpost-Eingangsautomatisierung',
      name: 'Briefpost-Eingangsautomatisierung',
      description:
        'Automatisierte Verarbeitung der eingehenden Briefpost: OCR, Volltext-Indexierung, KI-Klassifikation und Routing an die richtigen Systeme.',
      url: `${SITE_URL}${CANONICAL_PATH}`,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'Country', name: 'Deutschland' },
      audience: {
        '@type': 'Audience',
        name: 'Selbstständige, KMU und Agenturen in Deutschland',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Leistungen',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'OCR und Volltext-Indexierung' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'KI-Klassifikation und Dokument-Routing' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Prozess-Implementierung und Integration' } },
        ],
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}${CANONICAL_PATH}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Briefpost-Eingangsautomatisierung', item: `${SITE_URL}${CANONICAL_PATH}` },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}${CANONICAL_PATH}#faq`,
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ],
};

export default function Posteingang() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    company: '',
    email: '',
    phone: '',
    mail_volume: '',
    message: '',
  });
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    trackPageView('/posteingang', 'Briefpost-Eingangsautomatisierung');
    trackEvent('posteingang_view');
  }, []);

  const scrollToForm = () => {
    document.getElementById('anfrage')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    trackEvent('posteingang_cta_click');
  };

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
      toast.error('Bitte stimmen Sie der Datenschutzerklärung zu.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          type: 'posteingang',
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          name: `${form.first_name.trim()} ${form.last_name.trim()}`,
          company: form.company.trim() || undefined,
          email: form.email.trim(),
          phone: form.phone.trim(),
          mail_volume: form.mail_volume || undefined,
          message: form.message.trim() || 'Anfrage Briefpost-Eingangsautomatisierung',
          source: 'posteingang',
        },
      });
      if (error) throw error;
      if ((data as { error?: string })?.error) {
        throw new Error((data as { error: string }).error);
      }

      // Form-Felder als GA4/Ads-Eventparameter mappen.
      const conversionParams = {
        event_category: 'lead',
        event_label: 'posteingang',
        lead_type: 'posteingang',
        form_id: 'posteingang',
        mail_volume: form.mail_volume || 'unbekannt',
        has_company: form.company.trim().length > 0,
        has_message: form.message.trim().length > 0,
      };

      try {
        sessionStorage.setItem(
          'conversion_params',
          JSON.stringify(conversionParams),
        );
      } catch { /* ignore */ }

      // Meta Lead direkt feuern, GA4-Conversion mit verzögerter Navigation,
      // damit das Event vor dem Route-Wechsel sicher übermittelt wird.
      trackConversion('posteingang_submit', 'Lead', {
        mail_volume: form.mail_volume || 'unbekannt',
      });
      gtagSendEventAndNavigate(
        'conversion_event_submit_lead_form_1',
        '/danke/posteingang',
        {
          params: conversionParams,
          onNavigate: (url) => navigate(url),
        }
      );
    } catch (error: unknown) {
      console.error('Posteingang submit error:', error);
      const msg = error instanceof Error ? error.message : 'Fehler beim Senden. Bitte erneut versuchen.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Briefpost-Eingang automatisieren – OCR, KI-Klassifikation, Routing"
        description="Automatisierte Verarbeitung der eingehenden Briefpost: OCR, Volltext-Indexierung, KI-Klassifikation und Routing an die richtigen Systeme. Für Selbstständige, KMU und Agenturen."
        canonicalPath={CANONICAL_PATH}
        siteUrl={SITE_URL}
        jsonLd={POSTEINGANG_JSONLD}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 md:pt-20 pb-14 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              Briefpost-Eingangsautomatisierung
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Ihre Briefpost – digital, durchsuchbar und automatisch zugeordnet.
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              Wir automatisieren den Eingang Ihrer Briefpost vom Scan bis zur Zustellung im richtigen System. OCR, KI-Klassifikation und Routing in einem durchgängigen Prozess.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 px-6 h-14 bg-accent text-white font-bold rounded-xl hover:opacity-90 transition shadow-lg"
              >
                Kostenfreie Ist-Analyse anfordern
                <ArrowRight className="size-4" />
              </button>
              <a
                href="#ablauf"
                className="inline-flex items-center justify-center gap-2 px-6 h-14 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition"
              >
                So läuft die Einführung
              </a>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-primary" />
              DSGVO-konform · Hosting in Deutschland / EU · AV-Vertrag inklusive
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-14 md:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Briefpost bindet täglich Zeit, die im Tagesgeschäft fehlt.
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              Post öffnen, sortieren, scannen, zuordnen, weiterleiten – jeder Brief kostet mehrere manuelle Schritte. Dokumente liegen verstreut, Fristen werden knapp, und beim Suchen gehen Stunden pro Woche verloren.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Clock, label: 'Zeit', text: 'Manuelles Sortieren und Weiterleiten dauert pro Brief mehrere Minuten.' },
              { icon: FileText, label: 'Struktur', text: 'Dokumente landen in Ordnern, Postfächern oder Drive – selten einheitlich.' },
              { icon: ShieldCheck, label: 'Risiko', text: 'Fristen, Mahnungen und wichtige Schreiben werden übersehen oder verspätet bearbeitet.' },
            ].map((item) => (
              <div key={item.label} className="bg-card border border-border rounded-2xl p-6">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="size-5 text-primary" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">{item.label}</p>
                <p className="mt-2 text-sm text-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LÖSUNG — 3 SÄULEN */}
      <section className="py-14 md:py-20 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Die Lösung</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              OCR, KI und Prozess – in einem durchgängigen Workflow.
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              Wir liefern keine Einzelwerkzeuge, sondern einen vollständigen Prozess: vom Scan über die Klassifikation bis zur Ablage im Zielsystem.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="bg-card border border-border rounded-2xl p-6 md:p-7 shadow-sm">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <pillar.icon className="size-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VORTEILE */}
      <section className="py-14 md:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Ergebnis</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Was sich für Ihr Unternehmen konkret ändert.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm md:text-base text-foreground leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABLAUF */}
      <section id="ablauf" className="py-14 md:py-20 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">So läuft die Einführung</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Vier Schritte vom Erstgespräch bis zum produktiven Betrieb.
            </h2>
          </div>
          <ol className="grid md:grid-cols-2 gap-5">
            {STEPS.map((step) => (
              <li key={step.number} className="bg-card border border-border rounded-2xl p-6 md:p-7">
                <p className="text-3xl font-bold text-primary/70">{step.number}</p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Häufige Fragen</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Antworten auf die häufigsten Fragen zur Posteingangs-Automatisierung.
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item) => (
              <details
                key={item.question}
                className="group border border-border rounded-xl bg-card"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none px-5 py-4 text-sm md:text-base font-semibold text-foreground">
                  <span>{item.question}</span>
                  <ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULAR */}
      <section id="anfrage" className="py-14 md:py-20 bg-muted/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="space-y-3 mb-8"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">
              Kostenfreie Ist-Analyse
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-tight">
              Anfrage stellen – Antwort innerhalb von 24 Stunden.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Füllen Sie das Formular aus. Wir melden uns innerhalb von 24 Stunden mit einem Terminvorschlag für das Erstgespräch.
            </p>
          </motion.div>

          <form
            onSubmit={handleSubmit}
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
              <Label htmlFor="company">
                Firma <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Input
                id="company"
                placeholder="Mustermann GmbH"
                autoComplete="organization"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                maxLength={200}
                disabled={isSubmitting}
                className="h-12 text-base"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@firma.de"
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="mail_volume">
                Postvolumen <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <select
                id="mail_volume"
                value={form.mail_volume}
                onChange={(e) => setForm({ ...form, mail_volume: e.target.value })}
                disabled={isSubmitting}
                className="w-full h-12 rounded-md border border-input bg-background px-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Bitte wählen</option>
                {MAIL_VOLUME_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">
                Nachricht <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Textarea
                id="message"
                placeholder="Welche Dokumenttypen haben Sie? Welche Zielsysteme sollen angebunden werden?"
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
                  Anfrage senden
                </>
              )}
            </button>

            <p className="flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-primary shrink-0 mt-0.5" />
              <span>
                Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage genutzt. Details in der{' '}
                <Link to="/datenschutz" className="underline hover:text-foreground">
                  Datenschutzerklärung
                </Link>
                .
              </span>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
