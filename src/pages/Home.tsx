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
import { LeadMagnetSection } from '@/components/sections/LeadMagnetSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { ClosingSection } from '@/components/sections/ClosingSection';
import { InstagramSection } from '@/components/sections/InstagramSection';
import { PersonalContactSection } from '@/components/sections/PersonalContactSection';
import { AppointmentSection } from '@/components/sections/AppointmentSection';
import { ContactSection } from '@/components/sections/ContactSection';
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
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate:
                    'https://jan-sommershoff.de/?s={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            },
            {
              '@type': 'ItemList',
              '@id': 'https://jan-sommershoff.de/#sitelinks',
              name: 'Hauptbereiche',
              itemListElement: [
                {
                  '@type': 'SiteNavigationElement',
                  position: 1,
                  name: 'Potenzialanalyse',
                  description:
                    'Kostenfreie KI-Potenzialanalyse anfragen über das Kontaktformular.',
                  url: 'https://jan-sommershoff.de/#kontakt',
                },
                {
                  '@type': 'SiteNavigationElement',
                  position: 2,
                  name: 'KI System Analyse',
                  description:
                    'Tiefenanalyse deiner Prozesse & KI-Roadmap (499 €).',
                  url: 'https://jan-sommershoff.de/upsell',
                },
                {
                  '@type': 'SiteNavigationElement',
                  position: 3,
                  name: 'Projekte',
                  description: 'Ausgewählte Kundenprojekte und Referenzen.',
                  url: 'https://jan-sommershoff.de/portfolio',
                },
                {
                  '@type': 'SiteNavigationElement',
                  position: 4,
                  name: 'KI Notfallkoffer',
                  description:
                    'Kostenloser Lead-Magnet: Sofort-Hilfe für KI-Einsteiger.',
                  url: 'https://jan-sommershoff.de/#lead-magnet',
                },
                {
                  '@type': 'SiteNavigationElement',
                  position: 5,
                  name: 'Über mich',
                  description:
                    'Jan Sommershoff – Unternehmer, KI-Stratege und Systemarchitekt.',
                  url: 'https://jan-sommershoff.de/#story',
                },
                {
                  '@type': 'SiteNavigationElement',
                  position: 6,
                  name: 'WhatsApp Kontakt',
                  description: 'Direkter Chat über WhatsApp Business.',
                  url: 'https://wa.me/message/VSNLCZXNWTSKO1',
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

        {/* Lead Magnet */}
        <SectionTransition from="var(--muted)" to="var(--background)" height={48} />
        <LeadMagnetSection />

        {/* Closing */}
        <SectionTransition from="var(--background)" to="#0F3D2E" height={80} />
        <ClosingSection />

        {/* Instagram */}
        <SectionTransition from="#0a2e21" to="var(--background)" height={64} />
        <InstagramSection />

        {/* Personal Contact */}
        <SectionTransition from="var(--background)" to="#111111" height={64} />
        <PersonalContactSection />

        {/* Appointment */}
        <SectionTransition from="#111111" to="var(--background)" height={80} />
        <AppointmentSection />

        {/* Contact */}
        <SectionTransition from="var(--background)" to="var(--background)" height={48} />
        <ContactSection />

        {/* Final CTA */}
        <SectionTransition from="var(--background)" to="var(--primary)" height={80} />
        <CtaSection />

        <StickyCta />
        <ExitIntentPopup />
      </div>
    </>
  );
}
