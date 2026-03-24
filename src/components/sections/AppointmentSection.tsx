import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Calendar } from 'lucide-react';

export function AppointmentSection() {
  return (
    <section id="appointment" className="py-20 md:py-28 px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 text-primary mb-2">
              <Calendar className="size-5" />
              <span className="text-sm font-semibold tracking-widest uppercase">Terminbuchung</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Termin direkt buchen
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Wähle einen passenden Termin für ein persönliches Gespräch.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="rounded-2xl border border-primary/10 overflow-hidden shadow-lg">
            <iframe
              src="https://calendar.google.com/calendar/appointments/AcZssZ3GuR2F8Xsc_kX7S58la6ppPMLQ4BNDQok8xEI=?gv=true"
              title="Termin buchen – Jan Sommershoff"
              className="w-full min-h-[600px] md:min-h-[650px] border-0"
              loading="lazy"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
