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

export default function Home() {
  return (
    <>
      <SEOHead
        title="Jan Sommershoff – Comeback, KI & Unternehmertum"
        description="Ich begleite Unternehmer dabei, aus Chaos wieder ein System zu bauen – mit klaren Strukturen und KI als Hebel für bessere Entscheidungen."
      />
      <div className="min-h-screen">
        <HeroSection />
        <TrustSection />
        <SocialProofSection />
        <StorySection />
        <SituationsSection />
        <MistakesSection />
        <PhilosophySection />
        <ExpertiseSection />
        <KiZukunftSection />
        <ProjectsSection />
        <LeadMagnetSection />
        <ClosingSection />
        <PersonalContactSection />
        <ContactSection />
        <CtaSection />
        <StickyCta />
      </div>
    </>
  );
}