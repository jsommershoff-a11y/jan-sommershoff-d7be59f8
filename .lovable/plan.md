

# AGB-Seite hinzufügen

## Prüfungsergebnis E-Mail
Die E-Mail `j.s@jan-sommershoff.de` ist korrekt in Impressum, Datenschutz und Footer.

## Neue Seite: AGB

### 1. `src/pages/AGB.tsx` (neu)
Allgemeine Geschäftsbedingungen der SMB Consulting UG (haftungsbeschränkt) mit folgenden Abschnitten:
- Geltungsbereich
- Vertragsgegenstand
- Vertragsschluss
- Leistungen / Beratung
- Vergütung und Zahlung
- Haftung
- Widerrufsrecht
- Datenschutz (Verweis auf /datenschutz)
- Schlussbestimmungen (Gerichtsstand, salvatorische Klausel)

Gleicher Seitenstil wie Impressum/Datenschutz (max-w-3xl, prose, sections).

### 2. `src/App.tsx`
- Lazy-Import für AGB hinzufügen
- Route `/agb` mit Layout registrieren

### 3. `src/components/layout/Footer.tsx`
- Link zu `/agb` (AGB) zwischen Datenschutz und E-Mail einfügen

