

# Homepage erweitern: Conversion-optimierter One-Pager

## Zusammenfassung
Die bestehende Homepage wird um neue Sektionen erweitert und bestehende Sektionen werden inhaltlich geschärft, um die Positionierung als KI- und Prozessautomatisierungs-Experte zu verstärken. Das vorhandene Design-System (Farben, Animationen, ScrollReveal) bleibt erhalten, wird aber um die geforderten Akzente (Orange CTAs, Baulig-Stil Copywriting) ergänzt.

## Neue Sektionen

### 1. Hero Section überarbeiten (`HeroSection.tsx`)
- Headline: "Skalierbare Unternehmensprozesse durch KI & Automatisierung."
- Subheadline mit KRS Signature Positioning
- CTA "Jetzt Potenzialanalyse anfragen" (Orange-Akzent, Link zum Kontaktformular `#contact`)
- Trust-Zeile darunter: "150+ implementierte Systeme | 50+ Mitarbeiter geführt | Praxis statt Theorie"
- Bisheriges Hero-Bild bleibt erhalten

### 2. Neue Problem-Awareness Section (`ProblemSection.tsx`)
- Headline: "Jeder Tag ohne System kostet dich Geld, Kunden und Wachstum."
- 4 Problem-Boxen als Karten-Grid (Chaos im Vertrieb, Abhängigkeit, Ineffizienz, Fazit)
- Einbau nach ScrollTeaser, vor TrustSection

### 3. Neue KRS Signature Lösungs-Section (`KrsSignatureSection.tsx`)
- Headline: "Operative Exzellenz durch KRS Signature."
- 3 Säulen als Icon-Kacheln: Prozess-Audit, KI & Automatisierung, Struktur & Skalierung
- CTA zu krs-signature.de und Erstgespräch
- Einbau nach TrustSection

### 4. About/Authority Section überarbeiten (`StorySection.tsx`)
- Headline ändern zu: "Aus der Praxis. Nicht aus dem Lehrbuch."
- Kompaktere Story-Version mit Fokus auf Praxis-Credibility
- Bestehende ausführliche Story bleibt als Ergänzung erhalten

### 5. Testimonials erweitern (`TestimonialsSection.tsx` + `siteData.ts`)
- René Schreiner Testimonial hinzufügen mit dem spezifischen Zitat
- Headline: "Ergebnisse unserer Partner."

### 6. Lead-Magnet Section überarbeiten (`LeadMagnetSection.tsx`)
- Headline: "Der KI-Notfallkoffer für Unternehmer."
- Subtext: "Hol dir 10 KI Prompts und 3 Automatisierungs-Workflows..."
- Einfaches E-Mail-Formular statt externer Link (nutzt bestehendes Supabase Edge Function)
- Button: "Jetzt kostenlos anfordern"

### 7. Footer erweitern (`Footer.tsx`)
- Links zu KRS Digital und KRS Signature hinzufügen
- LinkedIn Icon behält bestehenden Link

## Angepasste Seitenreihenfolge in `Home.tsx`

```text
Hero (überarbeitet)
ScrollTeaser
ProblemSection (NEU)
TrustSection
KrsSignatureSection (NEU)
SocialProofSection
StorySection (überarbeitet als Authority)
PersonalFactsSection
SituationsSection
MistakesSection
PhilosophySection
ExpertiseSection
TestimonialsSection (erweitert)
KiZukunftSection
ProjectsSection
LeadMagnetSection (mit Formular)
ClosingSection
InstagramSection
PersonalContactSection
ContactSection
CtaSection
```

## Dateien

| Datei | Aktion |
|---|---|
| `src/components/sections/HeroSection.tsx` | Inhalt überarbeiten |
| `src/components/sections/ProblemSection.tsx` | Neu erstellen |
| `src/components/sections/KrsSignatureSection.tsx` | Neu erstellen |
| `src/components/sections/StorySection.tsx` | Headline + Intro anpassen |
| `src/components/sections/TestimonialsSection.tsx` | Headline anpassen |
| `src/components/sections/LeadMagnetSection.tsx` | E-Mail-Formular statt Link |
| `src/data/siteData.ts` | Testimonial + Lead Magnet Text aktualisieren |
| `src/components/layout/Footer.tsx` | KRS Links ergänzen |
| `src/pages/Home.tsx` | Neue Sektionen einbauen + SectionTransitions |

## Technische Details
- Alle neuen Sektionen nutzen bestehendes ScrollReveal + Framer Motion
- Orange-Akzent (`--accent: hsl(22 92% 54%)`) ist bereits als CSS-Variable vorhanden und passt zum geforderten `#f6711f`
- CTAs verlinken auf `#contact` (internes Kontaktformular) statt leere `#` Links
- Externer CTA zu krs-signature.de bleibt für "Erfahre mehr über KRS Signature"
- Mobile-first: alle neuen Sektionen responsiv mit bestehenden Tailwind-Breakpoints

