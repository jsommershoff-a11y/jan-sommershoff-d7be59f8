import { SEOHead } from '@/components/seo/SEOHead';
import { HeroSection } from '@/components/sections/HeroSection';
import { ScrollTeaser } from '@/components/sections/ScrollTeaser';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { KrsSignatureSection } from '@/components/sections/KrsSignatureSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { StorySection } from '@/components/sections/StorySection';
import { PersonalFactsSection } from '@/components/sections/PersonalFactsSection';
import { SituationsSection } from '@/components/sections/SituationsSection';
import { MistakesSection } from '@/components/sections/MistakesSection';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
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
        title="Jan Sommershoff – KI, Automatisierung & Unternehmertum"
        description="Skalierbare Unternehmensprozesse durch KI & Automatisierung. Ich helfe Unternehmern, operative Exzellenz durch die KRS Signature Programme zu erreichen."
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

        {/* Personal Facts */}
        <SectionTransition from="var(--background)" to="var(--muted)" height={48} />
        <PersonalFactsSection />

        {/* Situations */}
        <SituationsSection />

        {/* Mistakes */}
        <SectionTransition from="var(--muted)" to="#111111" height={80} />
        <MistakesSection />

        {/* Philosophy */}
        <SectionTransition from="#111111" to="var(--muted)" height={80} />
        <PhilosophySection />

        {/* Expertise */}
        <SectionTransition from="var(--muted)" to="var(--background)" height={48} />
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

        {/* Contact */}
        <SectionTransition from="#111111" to="var(--background)" height={80} />
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
