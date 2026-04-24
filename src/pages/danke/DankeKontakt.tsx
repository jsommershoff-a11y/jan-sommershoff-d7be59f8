import { ThankYou } from '@/components/ThankYou';

export default function DankeKontakt() {
  return (
    <ThankYou
      title="Danke für deine Nachricht!"
      subtitle="Wir haben deine Anfrage erhalten und melden uns innerhalb von 24 Stunden bei dir."
      eventName="contact_submit"
      metaEvent="Lead"
      leadFormConversionEvent="conversion_event_submit_lead_form_2"
    />
  );
}
