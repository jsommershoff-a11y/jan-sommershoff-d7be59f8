

# Conversion-Optimierung (aktualisiert)

Der Scroll-Teaser-Hook wird angepasst: Nicht "6-stellige Schulden überwunden", sondern die korrekte Formulierung — **7-stellige Schulden werden überwunden, 6-stellig bereits geschafft**. Das ist deutlich stärker als Hook.

## Änderungen

### 1. Hero: Scroll-Indikator + kürzere Subheadline + Mobile-Buttons vertikal
- Animierter Chevron-Pfeil am unteren Rand
- Subheadline kürzer/emotionaler: "Dein Unternehmen steckt fest? Ich zeige dir den Weg raus."
- Buttons auf Mobile (`flex-col` unter `md`) vertikal stapeln

### 2. Scroll-Teaser unter Hero (neuer Block in Home.tsx)
Hook-Text zwischen Hero und Trust-Section:
> **"Wie ich 7-stellige Schulden überwinde — und bereits 6-stellig hinter mir gelassen habe."**

Kurzer, neugierig machender Einzeiler der zum Weiterscrollen motiviert.

### 3. Sticky CTA: Threshold auf 30vh senken
Damit mobile Nutzer (63% Traffic, 8 Sek. Sitzungsdauer) den CTA überhaupt sehen.

### 4. Exit-Intent Popup
Neue Komponente `ExitIntentPopup.tsx` — zeigt den KI-Notfallkoffer an, wenn der Nutzer die Seite verlassen will (Desktop: mouseleave, Mobile: nach 5s Inaktivität).

### 5. siteData.ts
Neue/angepasste Texte für Hero-Subheadline und Scroll-Teaser mit der korrekten 7-stellig/6-stellig Formulierung.

