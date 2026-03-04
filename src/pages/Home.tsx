import { SEOHead } from '@/components/seo/SEOHead';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { StorySection } from '@/components/sections/StorySection';
import { SituationsSection } from '@/components/sections/SituationsSection';
import { MistakesSection } from '@/components/sections/MistakesSection';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { KiZukunftSection } from '@/components/sections/KiZukunftSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { LeadMagnetSection } from '@/components/sections/LeadMagnetSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { ClosingSection } from '@/components/sections/ClosingSection';
import { PersonalContactSection } from '@/components/sections/PersonalContactSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { StickyCta } from '@/components/sections/StickyCta';
import { SectionTransition } from '@/components/ui/SectionTransition';

export default function Home() {
  return (
    <>
      <SEOHead
        title="Jan Sommershoff – Comeback, KI & Unternehmertum"
        description="Ich begleite Unternehmer dabei, aus Chaos wieder ein System zu bauen – mit klaren Strukturen und KI als Hebel für bessere Entscheidungen."
      />
      <div className="min-h-screen">
        <HeroSection />
        {/* Hero (dark overlay ~black/45) → Trust (primary green) */}
        <SectionTransition from="hsl(0 0% 0% / 0.45)" to="hsl(160 61% 15%)" height={64} />
        <TrustSection />
        <SocialProofSection />
        {/* SocialProof (green) → Story (white bg) */}
        <SectionTransition from="#0F3D2E" to="hsl(0 0% 100%)" height={80} />
        <StorySection />
        {/* Story (white) → Situations (soft grey) – subtle */}
        <SectionTransition from="hsl(0 0% 100%)" to="#F3F4F3" height={48} />
        <SituationsSection />
        {/* Situations (light grey) → Mistakes (dark) */}
        <SectionTransition from="#F3F4F3" to="#111111" height={80} />
        <MistakesSection />
        {/* Mistakes (dark) → Philosophy (muted light) */}
        <SectionTransition from="#111111" to="hsl(120 3% 95%)" height={80} />
        <PhilosophySection />
        {/* Philosophy (muted) → Expertise (white) – subtle */}
        <SectionTransition from="hsl(120 3% 95%)" to="hsl(0 0% 100%)" height={48} />
        <ExpertiseSection />
        {/* Expertise (white) → KiZukunft (muted) – subtle */}
        <SectionTransition from="hsl(0 0% 100%)" to="hsl(120 3% 95%)" height={48} />
        <KiZukunftSection />
        {/* KiZukunft (muted) → Projects (white) – subtle */}
        <SectionTransition from="hsl(120 3% 95%)" to="hsl(0 0% 100%)" height={48} />
        <ProjectsSection />
        {/* Projects (white) → LeadMagnet (muted) – subtle */}
        <SectionTransition from="hsl(0 0% 100%)" to="hsl(120 3% 95%)" height={48} />
        <LeadMagnetSection />
        {/* LeadMagnet (muted) → Closing (green) */}
        <SectionTransition from="hsl(120 3% 95%)" to="#0F3D2E" height={80} />
        <ClosingSection />
        {/* Closing (dark green) → PersonalContact (dark) */}
        <SectionTransition from="#0a2e21" to="#111111" height={64} />
        <PersonalContactSection />
        {/* PersonalContact (dark) → Contact (white) */}
        <SectionTransition from="#111111" to="hsl(0 0% 100%)" height={80} />
        <ContactSection />
        {/* Contact (white) → CTA (primary green) */}
        <SectionTransition from="hsl(0 0% 100%)" to="hsl(160 61% 15%)" height={80} />
        <CtaSection />
        <StickyCta />
      </div>
    </>
  );
}
