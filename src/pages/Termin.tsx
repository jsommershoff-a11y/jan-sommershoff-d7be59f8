import { useEffect } from 'react';
import { trackConversion } from '@/lib/tracking';

/**
 * Conversion-Goal Route: /termin
 * Trackt Termin-Intent und leitet zur externen Buchungsseite weiter.
 */
export default function Termin() {
  useEffect(() => {
    trackConversion('termin_intent', 'Schedule', { content_name: 'Terminbuchung' });
    // Externe Buchungsseite — bitte ggf. anpassen
    window.location.href = 'https://calendar.google.com/calendar/u/0/appointments/AcZssZ0wXdz2vH3F1mC1pq8X';
  }, []);
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground">Du wirst zur Terminbuchung weitergeleitet …</p>
    </main>
  );
}
