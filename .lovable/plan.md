

# Repositionierung: Datensouveränität + Restliche Krisen-Referenzen entfernen

## Zusammenfassung
Zwei Aufgaben: (1) Alle verbliebenen Krisen-/Rückschlag-Referenzen in 5 Dateien bereinigen. (2) Eine neue **Datensouveränität-Sektion** einbauen, die das zentrale Argument vermittelt: Ohne eigene, sichere, zentrale Daten bist du im KI-Zeitalter aufgeschmissen.

---

## Teil 1: Verbliebene Krisen-Referenzen bereinigen

| Datei | Problem | Fix |
|---|---|---|
| **TrustSection.tsx** | "durch Krisen navigiert" | → "durch Wachstumsphasen navigiert" oder "skaliert" |
| **Leistungen.tsx** | "in einer Krise stecken", "Comeback-Strategien" | → "effizienter aufstellen wollen", "Zukunftsstrategien & KI-Integration" |
| **Auth.tsx** | "Unternehmenskrisen", "Krisensituationen" | → "Herausforderungen", "unternehmerische Entscheidungen" |
| **siteData.ts** | Testimonial "schwierigsten Phasen" | → "herausforderndsten Wachstumsphase" |
| **SEOHead.tsx** | Keywords enthalten "Comeback" | → "Automatisierung, Datensicherheit" |

---

## Teil 2: Neue Sektion — "Datensouveränität"

### Konzept
Eine eigene Sektion zwischen **SituationsSection** und **ExpertiseSection**, die das Kernargument emotionalisiert:

**Hook:** "Deine Daten gehören dir. Oder?"

**Szenarien** (als dramatische, kurze Karten):
- Steuerberater geht insolvent → nimmt deine Daten mit
- Cloud-Anbieter zieht sich aus dem Markt → deine Systeme sind offline
- Mitarbeiter verlässt das Unternehmen → Kundenwissen geht verloren
- Datenleck → Kundenvertrauen zerstört

**Kernaussage:** Wer in Zukunft KI nutzen will, braucht eine zentrale Datenbank aller Unternehmensinformationen — sicher, strukturiert, unter eigener Kontrolle. Nur so funktioniert personalisierte Kundenansprache. Nur so funktioniert KI.

**CTA:** "Lass uns prüfen, wie sicher deine Daten aufgestellt sind."

### Dateiname
`src/components/sections/DataSovereigntySection.tsx`

### Design
- Dunkler Hintergrund (`bg-[#111111]`) für Dramatik
- 4 Risiko-Karten im Grid (2x2) mit Icons (ShieldAlert, Database, Cloud, Users)
- Darunter: Grüner Highlight-Text mit der zentralen Botschaft
- Abschluss: CTA-Button zur Potenzialanalyse

### Einbau in Home.tsx
```text
...
SituationsSection
SectionTransition
→ DataSovereigntySection (NEU)
SectionTransition
ExpertiseSection
...
```

---

## Technische Details
- 1 neue Komponente: `DataSovereigntySection.tsx`
- 5 bestehende Dateien: Textänderungen (keine Strukturänderungen)
- `Home.tsx`: Import + Einbau der neuen Sektion mit SectionTransitions
- Alle bestehenden Animationen (ScrollReveal) werden für die neue Sektion übernommen
- Responsive Grid: 1 Spalte mobile, 2 Spalten desktop

