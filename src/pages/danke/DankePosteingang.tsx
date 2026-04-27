import { ThankYou } from '@/components/ThankYou';

export default function DankePosteingang() {
  return (
    <ThankYou
      title="Vielen Dank für Ihre Anfrage!"
      subtitle="Wir haben Ihre Anfrage zur Briefpost-Eingangsautomatisierung erhalten und melden uns innerhalb von 24 Stunden bei Ihnen."
      eventName="posteingang_lead"
      metaEvent="Lead"
      leadFormConversionEvent="conversion_event_submit_lead_form_2"
    />
  );
}
