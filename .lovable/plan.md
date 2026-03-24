

# Google Calendar Terminbuchung als eigene Sektion

## Zusammenfassung
Eine neue `AppointmentSection` wird erstellt, die den Google Calendar Terminbuchungs-Iframe einbettet. Die Sektion wird zwischen der PersonalContactSection und der ContactSection platziert — direkt nach dem persönlichen Appell und vor dem Kontaktformular.

## Änderungen

### Neue Datei: `src/components/sections/AppointmentSection.tsx`
- Headline: "Termin direkt buchen"
- Subtext: "Wähle einen passenden Termin für ein persönliches Gespräch."
- Google Calendar iframe (`calendar.google.com/calendar/appointments/...`) eingebettet
- Responsive: `max-w-4xl`, iframe mit `w-full` und `min-h-[600px]`
- Dark Mode: `bg-background`, Rahmen um iframe mit `rounded-2xl border border-primary/10`
- ScrollReveal-Animation wie alle anderen Sektionen

### `src/pages/Home.tsx`
- Import der neuen `AppointmentSection`
- Einbau zwischen PersonalContactSection und ContactSection mit passender SectionTransition

## Seitenreihenfolge (Ausschnitt)
```text
...
PersonalContactSection
SectionTransition
→ AppointmentSection (NEU)
SectionTransition
ContactSection
...
```

