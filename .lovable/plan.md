

## Plan: Absenderadresse aktualisieren und E-Mail-Versand testen

### Änderung

In `supabase/functions/send-contact-email/index.ts` (Zeile 86):

**Vorher:** `from: 'Website <onboarding@resend.dev>'`  
**Nachher:** `from: 'Jan Sommershoff <info@jan-sommershoff.de>'`

### Test

Nach dem Deploy der Änderung teste ich den Versand über das Kontaktformular und den KI-Notfallkoffer mit dem Browser-Tool, um sicherzustellen, dass E-Mails korrekt an j.s@krsimmobilien.de zugestellt werden.

