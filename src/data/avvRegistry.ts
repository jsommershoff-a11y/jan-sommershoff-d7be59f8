/**
 * AVV-Register (Auftragsverarbeitungsverträge nach Art. 28 DSGVO)
 *
 * Zentrale Datenquelle für alle AVVs/DPAs. Bei Vertragsänderung nur hier
 * pflegen — die Datenschutz-Seite zieht sich den Status automatisch.
 *
 * Status:
 *   • signed       — Vertrag liegt unterzeichnet vor
 *   • online_terms — Vertrag wurde durch Online-Akzeptanz geschlossen (Standard bei SaaS)
 *   • pending      — Anbieter genutzt, AVV-Abschluss läuft
 *   • not_required — kein AVV nötig (z.B. lokales Hosting, kein PII-Transfer)
 */

export type AvvStatus = 'signed' | 'online_terms' | 'pending' | 'not_required';

export type AvvEntry = {
  id: string;                 // slug für #anchor
  vendor: string;             // Anbieter
  service: string;            // verarbeiteter Dienst
  purpose: string;            // Verarbeitungszweck (1 Satz)
  status: AvvStatus;
  signedOn?: string;          // ISO-Datum (YYYY-MM-DD) der Vertragsannahme
  thirdCountry?: string;      // z.B. "USA", "Irland (EU)" — leer für DE
  legalBasis: string;         // SCC, DPF, Art. 28 …
  dpaUrl?: string;            // Link zum AVV/DPA des Anbieters
  privacyUrl?: string;        // Link zur Datenschutzerklärung des Anbieters
};

export const AVV_REGISTRY: AvvEntry[] = [
  {
    id: 'apollo',
    vendor: 'Apollo.io, Inc.',
    service: 'Apollo.io Website-Tracker',
    purpose: 'B2B-Besucher-Identifikation, Reichweiten- & Kampagnenmessung',
    status: 'online_terms',
    signedOn: '2026-04-30',
    thirdCountry: 'USA',
    legalBasis: 'Art. 28 DSGVO + EU-Standardvertragsklauseln (SCC) + EU-US Data Privacy Framework',
    dpaUrl: 'https://www.apollo.io/dpa',
    privacyUrl: 'https://www.apollo.io/privacy-policy',
  },
  {
    id: 'meta',
    vendor: 'Meta Platforms Ireland Ltd.',
    service: 'Meta Pixel (Facebook/Instagram Conversion-Tracking)',
    purpose: 'Conversion-Tracking, Remarketing-Zielgruppen',
    status: 'online_terms',
    signedOn: '2025-09-01',
    thirdCountry: 'Irland (EU) / USA',
    legalBasis: 'Art. 28 DSGVO + EU-Standardvertragsklauseln (SCC)',
    dpaUrl: 'https://www.facebook.com/legal/terms/dataprocessing',
    privacyUrl: 'https://www.facebook.com/privacy/policy',
  },
  {
    id: 'google',
    vendor: 'Google Ireland Ltd.',
    service: 'Google Tag Manager, Google Analytics 4, Google Ads',
    purpose: 'Tag-Verwaltung, Reichweitenanalyse, Kampagnen-Tracking',
    status: 'online_terms',
    signedOn: '2025-09-01',
    thirdCountry: 'Irland (EU) / USA',
    legalBasis: 'Art. 28 DSGVO + EU-Standardvertragsklauseln (SCC) + EU-US Data Privacy Framework',
    dpaUrl: 'https://business.safety.google/processorterms/',
    privacyUrl: 'https://policies.google.com/privacy',
  },
  {
    id: 'supabase',
    vendor: 'Supabase, Inc.',
    service: 'Datenbank, Authentifizierung, Edge Functions, Storage',
    purpose: 'Hosting der Backend-Infrastruktur, Speicherung von Kontaktanfragen',
    status: 'online_terms',
    signedOn: '2025-09-01',
    thirdCountry: 'EU (Frankfurt)',
    legalBasis: 'Art. 28 DSGVO',
    dpaUrl: 'https://supabase.com/legal/dpa',
    privacyUrl: 'https://supabase.com/privacy',
  },
  {
    id: 'resend',
    vendor: 'Resend, Inc.',
    service: 'Transaktionale E-Mails (Bestätigungen an Anfragende & Admin-Benachrichtigungen)',
    purpose: 'Versand von Kontaktbestätigungen und internen Benachrichtigungen',
    status: 'online_terms',
    signedOn: '2025-09-01',
    thirdCountry: 'USA',
    legalBasis: 'Art. 28 DSGVO + EU-Standardvertragsklauseln (SCC)',
    dpaUrl: 'https://resend.com/legal/dpa',
    privacyUrl: 'https://resend.com/legal/privacy-policy',
  },
  {
    id: 'lovable',
    vendor: 'Lovable AB',
    service: 'Hosting der Website (Edge-CDN, SSL)',
    purpose: 'Auslieferung der statischen Website-Inhalte',
    status: 'online_terms',
    signedOn: '2025-09-01',
    thirdCountry: 'Schweden (EU)',
    legalBasis: 'Art. 28 DSGVO',
    dpaUrl: 'https://lovable.dev/legal/dpa',
    privacyUrl: 'https://lovable.dev/privacy',
  },
];

export const STATUS_LABELS: Record<AvvStatus, string> = {
  signed: 'Unterzeichnet',
  online_terms: 'Online-Vertragsannahme',
  pending: 'In Vorbereitung',
  not_required: 'Nicht erforderlich',
};
