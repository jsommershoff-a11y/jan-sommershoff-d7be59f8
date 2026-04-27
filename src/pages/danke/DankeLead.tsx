import { ThankYou } from '@/components/ThankYou';

export default function DankeLead() {
  return (
    <ThankYou
      title="Dein KI-Notfallkoffer ist unterwegs!"
      subtitle="Du erhältst in den nächsten Minuten eine E-Mail mit allen Inhalten."
      eventName="lead_magnet_submitted"
      metaEvent="Lead"
      leadFormConversionEvent="conversion_event_submit_lead_form_2"
    />
  );
}
