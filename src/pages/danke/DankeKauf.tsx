import { ThankYou } from '@/components/ThankYou';

export default function DankeKauf() {
  return (
    <ThankYou
      title="Vielen Dank für deinen Kauf!"
      subtitle="Deine Bestellung wurde bestätigt. Du erhältst alle Details per E-Mail."
      eventName="purchase"
      metaEvent="Purchase"
      value={499}
      currency="EUR"
      primaryHref="/"
      primaryLabel="Zur Startseite"
    />
  );
}
