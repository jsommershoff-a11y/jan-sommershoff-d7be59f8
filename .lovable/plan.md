

# Restliche Rückschlag-Referenzen bereinigen + Bild-Overlay

## Zusammenfassung
8 Stellen mit Krisen-/Rückschlag-Sprache werden bereinigt. Das Bild in der PersonalContactSection wird mit einem CSS-Overlay versehen, das den eingebrannten "Comeback"-Text überdeckt und durch "Automatisierung. Struktur. KI." ersetzt.

## Änderungen

### 1. PersonalContactSection.tsx — Bild-Overlay
Das Bild `hero-jan-new.png` enthält "Comeback. Struktur. KI." als eingebrannten Text. Fix: Ein CSS-Gradient-Overlay über den unteren Bildbereich legen und einen neuen Text-Span darüber positionieren mit **"Automatisierung. Struktur. KI."**

### 2. TrustSection.tsx
- "durch Krisen navigiert" → "erfolgreich skaliert"

### 3. Leistungen.tsx
- "Klarheit in schwierigen Phasen" → "Klarheit für nachhaltiges Wachstum"
- "in einer Krise stecken" → "effizienter aufstellen wollen"
- "Comeback-Strategien" → "Zukunftsstrategien und KI-Integration"

### 4. Auth.tsx
- "Unternehmenskrisen" → "unternehmerische Herausforderungen"
- "Krisensituationen" → "strategische Entscheidungen"

### 5. siteData.ts
- Testimonial "schwierigsten Phasen" → "herausforderndsten Wachstumsphase"

### 6. SEOHead.tsx
- Keyword "Comeback" → "Automatisierung, Datensicherheit"

### 7. LeadMagnetSection.tsx
- "schwierige Situationen" → "strategische Entscheidungen"

### 8. ContactSection.tsx
- "schwierigen Momenten" → "entscheidenden Momenten"

## Technische Details
- 8 Dateien mit reinen Textänderungen
- PersonalContactSection: zusätzlich ein `absolute`-positioniertes `div` mit Gradient + neuem Text über dem Bildbereich
- Keine Strukturänderungen, keine neuen Dateien

