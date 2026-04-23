import { SEOHead } from '@/components/seo/SEOHead';
import { HeroSection } from '@/components/sections/HeroSection';
import { ScrollTeaser } from '@/components/sections/ScrollTeaser';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { KrsSignatureSection } from '@/components/sections/KrsSignatureSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { StorySection } from '@/components/sections/StorySection';
import { VideoSection } from '@/components/sections/VideoSection';
import { SituationsSection } from '@/components/sections/SituationsSection';
import { DataSovereigntySection } from '@/components/sections/DataSovereigntySection';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { KiZukunftSection } from '@/components/sections/KiZukunftSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { ClosingSection } from '@/components/sections/ClosingSection';
import { InstagramSection } from '@/components/sections/InstagramSection';
import { PersonalContactSection } from '@/components/sections/PersonalContactSection';
import { SitelinksSection } from '@/components/sections/SitelinksSection';
import { StickyCta } from '@/components/sections/StickyCta';
import { ExitIntentPopup } from '@/components/ui/ExitIntentPopup';
import { SectionTransition } from '@/components/ui/SectionTransition';

export default function Home() {
  return (
    <>
      <SEOHead
        title="KI-Beratung & Automatisierung für Unternehmer"
        description="KI-Beratung, Automatisierung & Systemarchitektur für Unternehmer. Bis zu 30 Std./Woche Zeitersparnis durch klare Prozesse und intelligente KI-Integration."
        canonicalPath="/"
        siteUrl="https://jan-sommershoff.de"
        imageAlt="Jan Sommershoff – KI-Beratung & Automatisierung für Unternehmer"
        jsonLd={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'ProfessionalService',
              '@id': 'https://jan-sommershoff.de/#service',
              name: 'Jan Sommershoff – KI-Beratung',
              description:
                'KI-Beratung, Automatisierung und Systemarchitektur für Unternehmer und Mittelstand.',
              areaServed: 'DE',
              url: 'https://jan-sommershoff.de',
              provider: { '@type': 'Person', name: 'Jan Sommershoff' },
            },
            {
              '@type': 'WebSite',
              '@id': 'https://jan-sommershoff.de/#website',
              url: 'https://jan-sommershoff.de',
              name: 'Jan Sommershoff',
              description:
                'KI-Beratung, Automatisierung & Systemarchitektur für Unternehmer.',
              inLanguage: 'de-DE',
              publisher: { '@type': 'Person', name: 'Jan Sommershoff' },
            },
            {
              '@type': 'ItemList',
              '@id': 'https://jan-sommershoff.de/#sitelinks',
              name: 'Hauptbereiche',
              itemListElement: [
                {
                  '@type': 'SiteNavigationElement',
                  position: 1,
                  name: 'KI-Beratung & Leistungen',
                  description:
                    'Übersicht aller KI-Beratungs- und Automatisierungs-Leistungen für Unternehmer.',
                  url: 'https://jan-sommershoff.de/leistungen',
                },
                {
                  '@type': 'SiteNavigationElement',
                  position: 2,
                  name: 'Postautomatisierung',
                  description:
                    'KI-gestützte Posteingangs-Automatisierung: OCR, Klassifikation und Routing.',
                  url: 'https://jan-sommershoff.de/postautomatisierung',
                },
                {
                  '@type': 'SiteNavigationElement',
                  position: 3,
                  name: 'Kostenfreie Potenzialanalyse',
                  description:
                    'Unverbindliche KI-Potenzialanalyse für Unternehmer und Mittelstand.',
                  url: 'https://jan-sommershoff.de/kontakt?ziel=potenzialanalyse',
                },
                {
                  '@type': 'SiteNavigationElement',
                  position: 4,
                  name: 'KI Notfallkoffer sichern',
                  description:
                    'Kostenloser Lead-Magnet mit Sofort-Hilfe für KI-Einsteiger.',
                  url: 'https://jan-sommershoff.de/kontakt?ziel=notfallkoffer',
                },
                {
                  '@type': 'SiteNavigationElement',
                  position: 5,
                  name: 'Über Jan Sommershoff',
                  description:
                    'Unternehmer, KI-Stratege und Systemarchitekt – Werdegang und Mission.',
                  url: 'https://jan-sommershoff.de/#story',
                },
                {
                  '@type': 'SiteNavigationElement',
                  position: 6,
                  name: 'Kontakt aufnehmen',
                  description:
                    'Direkter Kontakt per Formular, WhatsApp oder Terminbuchung.',
                  url: 'https://jan-sommershoff.de/kontakt',
                },
              ],
            },
          ],
        }}
      />
      <div className="min-h-screen">
        <HeroSection />
        <ScrollTeaser />

        {/* Problem Awareness */}
        <ProblemSection />

        {/* Trust */}
        <SectionTransition from="var(--background)" to="var(--primary)" height={64} />
        <TrustSection />
        <SocialProofSection />

        {/* KRS Signature Solution */}
        <SectionTransition from="#0F3D2E" to="var(--muted)" height={80} />
        <KrsSignatureSection />

        {/* Authority / Story */}
        <SectionTransition from="var(--muted)" to="var(--background)" height={48} />
        <StorySection />

        {/* Marketing Video */}
        <VideoSection />

        {/* Situations / Challenges */}
        <SectionTransition from="var(--background)" to="var(--muted)" height={48} />
        <SituationsSection />

        {/* Data Sovereignty */}
        <SectionTransition from="var(--muted)" to="#111111" height={64} />
        <DataSovereigntySection />

        {/* Expertise */}
        <SectionTransition from="#111111" to="var(--background)" height={64} />
        <ExpertiseSection />

        {/* Testimonials */}
        <SectionTransition from="var(--background)" to="var(--muted)" height={48} />
        <TestimonialsSection />

        {/* KI & Zukunft */}
        <SectionTransition from="var(--muted)" to="var(--background)" height={48} />
        <KiZukunftSection />

        {/* Projects */}
        <SectionTransition from="var(--background)" to="var(--muted)" height={48} />
        <ProjectsSection />

        {/* Closing */}
        <SectionTransition from="var(--muted)" to="#0F3D2E" height={80} />
        <ClosingSection />

        {/* Instagram */}
        <SectionTransition from="#0a2e21" to="var(--background)" height={64} />
        <InstagramSection />

        {/* Personal Contact */}
        <SectionTransition from="var(--background)" to="#111111" height={64} />
        <PersonalContactSection />

        {/* Sitelinks – sichtbarer Schnellzugriff (mobil-optimiert) */}
        <SectionTransition from="#111111" to="var(--background)" height={64} />
        <SitelinksSection />

        {/* Final CTA */}
        <SectionTransition from="var(--background)" to="var(--primary)" height={80} />
        <CtaSection />

        <StickyCta />
        <ExitIntentPopup />
      </div>
    </>
  );
}
