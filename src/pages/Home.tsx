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
        {/* Hero (dark overlay) → Trust (primary green) */}
        <SectionTransition from="hsl(0 0% 0% / 0.45)" to="var(--primary)" height={64} />
        <TrustSection />
        <SocialProofSection />
        {/* SocialProof (green) → Story (background) */}
        <SectionTransition from="#0F3D2E" to="var(--background)" height={80} />
        <StorySection />
        {/* Story (background) → Situations (soft grey / muted in dark) */}
        <SectionTransition from="var(--background)" to="var(--muted)" height={48} />
        <SituationsSection />
        {/* Situations (muted) → Mistakes (dark) */}
        <SectionTransition from="var(--muted)" to="#111111" height={80} />
        <MistakesSection />
        {/* Mistakes (dark) → Philosophy (muted) */}
        <SectionTransition from="#111111" to="var(--muted)" height={80} />
        <PhilosophySection />
        {/* Philosophy (muted) → Expertise (background) */}
        <SectionTransition from="var(--muted)" to="var(--background)" height={48} />
        <ExpertiseSection />
        {/* Expertise (background) → KiZukunft (muted) */}
        <SectionTransition from="var(--background)" to="var(--muted)" height={48} />
        <KiZukunftSection />
        {/* KiZukunft (muted) → Projects (background) */}
        <SectionTransition from="var(--muted)" to="var(--background)" height={48} />
        <ProjectsSection />
        {/* Projects (background) → LeadMagnet (muted) */}
        <SectionTransition from="var(--background)" to="var(--muted)" height={48} />
        <LeadMagnetSection />
        {/* LeadMagnet (muted) → Closing (green) */}
        <SectionTransition from="var(--muted)" to="#0F3D2E" height={80} />
        <ClosingSection />
        {/* Closing (dark green) → PersonalContact (dark) */}
        <SectionTransition from="#0a2e21" to="#111111" height={64} />
        <PersonalContactSection />
        {/* PersonalContact (dark) → Contact (background) */}
        <SectionTransition from="#111111" to="var(--background)" height={80} />
        <ContactSection />
        {/* Contact (background) → CTA (primary green) */}
        <SectionTransition from="var(--background)" to="var(--primary)" height={80} />
        <CtaSection />
        <StickyCta />
      </div>
    </>
  );
}
