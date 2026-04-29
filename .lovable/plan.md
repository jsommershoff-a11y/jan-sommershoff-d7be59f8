# Plan: Weiterleitung auf Subdomain einrichten

## Ziel
Die beiden Pfade
- `https://dein-automatisierungsberater.de/gessner`
- `https://dein-automatisierungsberater.de/süddeutschland`

sollen permanent auf `https://gessner.dein-automatisierungsberater.de` weiterleiten.

## Wichtiger Hinweis vorab
Die Subdomain `gessner.dein-automatisierungsberater.de` existiert aktuell **nicht** in den verbundenen Lovable-Domains (verbunden sind nur `jan-sommershoff.de`, `dein-automatisierungsberater.de`, `www.dein-automatisierungsberater.de`).

Damit die Weiterleitung ein gültiges Ziel hat, musst du **vorher** die Subdomain entweder
1. in **Project Settings → Domains** zu diesem Projekt hinzufügen (DNS: A-Record `gessner` → `185.158.133.1`), **oder**
2. zu einem anderen Lovable-Projekt verbinden (falls Gessner eine eigene Seite bekommt).

Ohne existierendes Ziel produziert die Weiterleitung sonst eine kaputte Seite. Sag mir kurz, welche Variante – ich kann mit dem Code-Teil aber unabhängig davon starten.

## Umsetzung im Code

Da Lovable-Hosting **keine** server-seitigen Redirects unterstützt (kein `_redirects`, `vercel.json` etc.), wird die Weiterleitung client-seitig über React Router realisiert. Das ist für SEO ausreichend in Kombination mit korrekten `<link rel="canonical">`-Tags und Sitemap-Update.

### 1. Routen in `src/App.tsx` ergänzen
Zwei neue Routes vor der Catch-all `*`-Route:

```tsx
<Route
  path="/gessner"
  element={<ExternalRedirect to="https://gessner.dein-automatisierungsberater.de" />}
/>
<Route
  path="/süddeutschland"
  element={<ExternalRedirect to="https://gessner.dein-automatisierungsberater.de" />}
/>
```

Zusätzlich URL-encodierte Variante `/s%C3%BCddeutschland` wird durch React Router automatisch auf den dekodierten Pfad gematcht – kein zweiter Eintrag nötig.

### 2. Neue Komponente `src/components/ExternalRedirect.tsx`
Macht ein hartes `window.location.replace(to)` direkt beim Mount. Zeigt während der Weiterleitung den `LoadingFallback`. Setzt zusätzlich:
- `<meta http-equiv="refresh" content="0;url=...">` als Fallback ohne JS
- `<link rel="canonical">` auf die Ziel-URL (SEO-Signal an Google, dass die Subdomain die kanonische Adresse ist)

### 3. Sitemap aktualisieren (`public/sitemap.xml`)
- Veraltete Pfade entfernen (z.B. `/postautomatisierung` ist im Menü gelöscht, gehört nicht mehr in die Sitemap)
- Optional: Hinweis, dass `/gessner` und `/süddeutschland` **nicht** in die Sitemap aufgenommen werden – sie sind reine Vanity-Redirects.

## Was nicht funktioniert (zur Klarstellung)
- **301-Redirects auf Server-Ebene** sind auf Lovable-Hosting nicht konfigurierbar. Der client-seitige Redirect ist die unterstützte Lösung.
- Für „echte" 301-Header bräuchtest du Cloudflare-Proxy davor mit Page Rules – das ist eine separate Infrastruktur-Entscheidung.

## Dateien, die geändert werden
- `src/App.tsx` (neue Routen)
- `src/components/ExternalRedirect.tsx` (neu)
- `public/sitemap.xml` (Cleanup)

## Offene Frage an dich
Soll ich die Subdomain `gessner.dein-automatisierungsberater.de` in **diesem** Projekt anbinden (gleiche Seite), oder zeigt sie auf ein **separates** Lovable-Projekt für Gessner? Das beeinflusst nur deine DNS-Schritte, nicht den Code.
