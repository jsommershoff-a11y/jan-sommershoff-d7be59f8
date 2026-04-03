

# Repositionierung: Von Comeback-Story zu KI-Zukunftspartner

## Zusammenfassung
Die gesamte Website wird vom persönlichen Rückschlag-Narrativ auf eine zukunftsorientierte Positionierung umgestellt: **"Wir machen Unternehmen KI-fit und sichern ihre Zukunft."** Der Fokus liegt auf Automatisierung (bis zu 30 Std./Woche Ersparnis), Datensicherheit und Zukunftsfähigkeit.

## Sektionen die entfernt werden

| Sektion | Grund |
|---|---|
| **ScrollTeaser** | "7-stellige Schulden" — persönliche Rückschlag-Story |
| **MistakesSection** | Komplett auf Fehler/Scheitern fokussiert |
| **PhilosophySection** | Zitate über Krisen und Scheitern |
| **PersonalFactsSection** | Persönliche Details (Alter, Kinder, Studium) — nicht relevant für B2B-Positionierung |

Diese 4 Sektionen werden aus `Home.tsx` entfernt (inkl. zugehöriger SectionTransitions).

## Sektionen die umgeschrieben werden

### 1. Hero (siteData + HeroSection)
- Neue Headline: **"Mach dein Unternehmen KI-fit. Bevor es zu spät ist."**
- Subheadline: Automatisierungen sparen bis zu 30 Std./Woche
- Trust-Elemente anpassen: "150+ automatisierte Prozesse | Bis zu 30 Std. Zeitersparnis/Woche | Datensicherheit & Zukunftsfähigkeit"

### 2. ScrollTeaser → Ersetzen durch "Impact-Statement"
- Statt Schulden-Story: Ein neuer prägnanter Teaser über KI-Zukunft
- z.B. "Unternehmen, die heute nicht automatisieren, werden morgen abgehängt."

### 3. StorySection → "Über uns / Warum KRS"
- Persönliche Schulden-/Krisenreferenzen entfernen
- Neu: Positionierung als erfahrener Systemarchitekt mit Praxiserfahrung in 150+ Implementierungen
- Fokus: "Wir kennen die Prozesse, die Unternehmen ausbremsen — und die KI-Lösungen, die sie beschleunigen."

### 4. SituationsSection → "Typische Herausforderungen"
- Alle persönlichen Fehler-Geschichten entfernen
- Stattdessen: Kunden-Perspektive ("Dein Team verbringt zu viel Zeit mit manuellen Aufgaben", "Deine Daten sind nicht zukunftssicher", etc.)
- Insight-Texte auf KI-Lösungen und konkrete Zeitersparnis fokussieren

### 5. ClosingSection → "Zukunftssicher mit KI"
- Krisen-Narrativ komplett entfernen
- Neu: Fokus auf "Unternehmen die jetzt handeln vs. Unternehmen die abgehängt werden"
- Konkrete Vorteile: Automatisierung, Datensicherheit, skalierbare Prozesse

### 6. PersonalContactSection
- Krisenreferenzen entfernen ("Druck", "nicht mehr weiter weiß")
- Neu: Professioneller Beratungsansatz — "Lass uns gemeinsam prüfen, wo KI in deinem Unternehmen sofort Wirkung zeigt"

### 7. siteData.ts — Komplett-Update
- `heroHeadline`, `heroSubheadline`, `scrollTeaser`: KI-Zukunft statt Comeback
- `story.paragraphs`: Neue, vorwärtsgerichtete Texte
- `philosophy`: Entfernen oder durch KI-Business-Prinzipien ersetzen
- `cta.text`: Zukunftsfokus statt Krisen-Empathie
- `kiZukunft.paragraphs`: "30 Std. Zeitersparnis" als konkreten Benefit einbauen

## Neue Kernbotschaften (durchgehend)

- **"Bis zu 30 Stunden pro Woche einsparen durch Automatisierung"**
- **"Daten sicher aufstellen für die KI-Zukunft"**
- **"Nicht abgehängt werden — jetzt handeln"**
- **"Wir machen dein Unternehmen KI-fit"**

## Was bleibt unverändert
- ProblemSection (bereits Business-fokussiert, passt)
- TrustSection & SocialProofSection
- KrsSignatureSection (Herzstück des Angebots)
- ExpertiseSection
- TestimonialsSection
- KiZukunftSection (wird nur textlich erweitert um 30-Std-Benefit)
- ProjectsSection
- LeadMagnetSection
- InstagramSection
- AppointmentSection
- ContactSection
- CtaSection (Text-Update via siteData)

## Technische Details
- 4 Sektionen + ihre SectionTransitions aus `Home.tsx` entfernen
- 6 Komponenten-Dateien textlich überarbeiten
- `siteData.ts` komplett aktualisieren
- Keine neuen Dateien, keine Strukturänderungen
- Alle bestehenden Animationen und Visuals bleiben erhalten

