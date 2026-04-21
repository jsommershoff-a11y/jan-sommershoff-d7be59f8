import { ThankYou } from '@/components/ThankYou';

export default function DankeTermin() {
  return (
    <ThankYou
      title="Dein Termin ist gebucht!"
      subtitle="Du bekommst eine Bestätigung per E-Mail mit allen Details zum Gespräch."
      eventName="schedule_completed"
      metaEvent="Schedule"
    />
  );
}
