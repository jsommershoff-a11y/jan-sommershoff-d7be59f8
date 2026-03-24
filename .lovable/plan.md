

# Hochwertige KI-generierte Visuals für die Website

## Zusammenfassung
3 KI-generierte Visuals werden erstellt und in die wichtigsten Conversion-Sektionen eingebaut: Problem Section, KRS Signature Section und Social Proof / Ergebnisse. Die About/Story Section behält das echte Foto. Hero Section behält ebenfalls das echte Foto von Jan.

## Visuals (3 Stück, einheitlicher Stil)

### Visual 1 — Problem Section
**Prompt:** Split screen showing chaotic business operations (messy sticky notes, overflowing inbox, confusion) vs structured automated system with clean dark dashboard and organized workflows, dark background with subtle green (#0F3D2E) glowing highlights, strong contrast, minimalistic SaaS aesthetic, cinematic lighting, 4k
**Platzierung:** Oberhalb der Problem-Karten als Full-Width-Bild mit abgerundeten Ecken und Overlay-Gradient

### Visual 2 — KRS Signature Section (Kernvisual)
**Prompt:** High-end business automation system dashboard with connected modules showing CRM, marketing automation and sales pipeline, glowing green (#0F3D2E) data flows connecting nodes, dark UI background, minimalistic SaaS interface design, ultra clean professional look, cinematic lighting, 4k
**Platzierung:** Zwischen Headline und den 3 Säulen-Kacheln als zentrales Visual

### Visual 3 — Social Proof Section
**Prompt:** Modern business analytics dashboard with increasing revenue charts, performance metrics and growth KPI indicators, dark UI with green (#0F3D2E) highlights and accents, minimalistic SaaS style, high clarity, cinematic lighting, ultra sharp, 4k
**Platzierung:** Als Hintergrund-Visual hinter den Stats mit niedrigem Opacity-Overlay

## Dateien

| Datei | Aktion |
|---|---|
| AI Image Generation (3x) | Bilder via Lovable AI generieren, speichern als `src/assets/visual-*.png` |
| `src/components/sections/ProblemSection.tsx` | Visual oberhalb der Karten einfügen |
| `src/components/sections/KrsSignatureSection.tsx` | Dashboard-Visual zwischen Headline und Säulen |
| `src/components/sections/SocialProofSection.tsx` | Hintergrund-Visual mit Overlay |

## Technische Details
- Bilder werden über die Lovable AI Gateway mit `google/gemini-3-pro-image-preview` generiert (höchste Qualität)
- Bilder als PNG in `src/assets/` gespeichert und per Import referenziert
- Responsive: Bilder mit `object-cover`, `rounded-2xl`, und passenden max-width Constraints
- Performance: Bilder werden über Vite optimiert (statischer Import)
- Kein Orange-Akzent in den Bildern — nur Grün (#0F3D2E) als Highlight-Farbe
- Dark Mode kompatibel durch dunkle Bildästhetik

