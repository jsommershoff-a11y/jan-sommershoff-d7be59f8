# Plan: KI Notfallkoffer komplett entfernen

Ziel: Den Lead-Magnet „KI Notfallkoffer" überall aus der Website, Tracking-Logik, Auth-Funnel, Admin-UI und Edge Function entfernen. Einziger verbleibender Conversion-Pfad: **Potenzialanalyse** (`/kontakt?ziel=potenzialanalyse`).

---

## Was passiert

### 1. Routen & Redirects
- `src/App.tsx`: Route `/notfallkoffer` entfernen.
- `/auth` Route prüfen: bestand der Auth-Funnel **ausschließlich** für den Notfallkoffer? → Ja, laut `Auth.tsx`. **Auth-Seite + Route entfernen**, oder soll sie als Hülle für künftige Logins bleiben? **Entscheidung: entfernen** (siehe Folge-Verbesserungen unten, falls du sie behalten willst, sag Bescheid).

### 2. Sections / CTAs
- `HeroSection.tsx` (Z. 85–88): Notfallkoffer-Button raus. Sekundär-CTA entweder löschen oder durch zweiten Potenzialanalyse-Verweis ersetzen → **löschen** (kein doppelter CTA).
- `KiZukunftSection.tsx` (Z. 48–51): Notfallkoffer-Link raus, durch Potenzialanalyse ersetzen.
- `SitelinksSection.tsx` (Z. 41–43): Sitelink-Eintrag „KI Notfallkoffer sichern" entfernen.
- `StickyCta.tsx`: komplette Sticky-CTA war auf Notfallkoffer ausgelegt → **auf Potenzialanalyse umstellen** (Text + Link + Tracking-IDs).
- `ExitIntentPopup.tsx`: Popup-Inhalt auf Potenzialanalyse umschreiben (Text, Link, Tracking-IDs).

### 3. Kontaktformular
- `src/pages/Kontakt.tsx`:
  - `Ziel`-Type auf nur noch `'potenzialanalyse'` reduzieren.
  - `ZIELE`-Map: Eintrag `notfallkoffer` löschen.
  - `parseZiel`: immer `'potenzialanalyse'` zurückgeben.
  - Alle `ziel === 'notfallkoffer'`-Verzweigungen entfernen.
  - Routing-Split (`/danke/lead` vs `/danke/kontakt`) → nur noch `/danke/kontakt`.

### 4. Danke-Seiten
- `src/pages/danke/DankeLead.tsx`: **Datei löschen** (war nur für Notfallkoffer).
- Route `/danke/lead` aus `App.tsx` entfernen.

### 5. Tracking
- `MetaPixelRouterTracker.tsx` (Z. 52): `content_name: 'KI Notfallkoffer'` und zugehörige CompleteRegistration-Logik für `/danke/lead` entfernen.
- `AdminConversions.tsx`: alle Notfallkoffer-Tracking-Doku-Einträge (Z. 30–34, 52, 57–61, 79, 85–88, 113–129, 335, 371) entfernen. Dashboard zeigt nur noch Potenzialanalyse-Funnel.

### 6. Admin
- `src/pages/Admin.tsx`:
  - Filter-Type von `'all' | 'lead_magnet' | 'contact'` → nur noch `'all' | 'contact'` (oder Filter ganz raus, da nur ein Typ übrig).
  - Filter-Button „Lead-Magnet" entfernen.
  - Badge-Logik vereinfachen.
  - Mail-Subject-Sonderfall (Z. 682–683) entfernen.

### 7. Auth-Funnel
- `src/pages/Auth.tsx`: **Datei löschen** (komplett auf Notfallkoffer ausgerichtet).
- Route `/auth` aus `App.tsx` entfernen.
- **Achtung:** Falls bereits Nutzer in `auth.users` registriert sind, bleiben deren Accounts erhalten — nur die UI-Seite verschwindet. Soll ich die User-Liste vorab prüfen? (Sag Bescheid, dann mache ich `SELECT count(*) FROM auth.users` vorher.)

### 8. Edge Function `send-contact-email`
- `supabase/functions/send-contact-email/index.ts`:
  - `type`-Validierung (Z. 96): nur noch `'contact'` zulassen.
  - `isLeadMagnet`-Logik (Z. 189) und gesamten Lead-Magnet-Email-Branch (Z. 349–415, inkl. `downloadUrl`-TODO) entfernen.
  - Admin-Notification-Subject vereinheitlichen.

### 9. DB
- **Keine Schema-Änderungen.** Bestehende `contact_submissions` mit `type='lead_magnet'` bleiben als Historie erhalten — sind nicht löschbar ohne Datenverlust. Falls du sie löschen willst, sag Bescheid (wäre `DELETE FROM contact_submissions WHERE type='lead_magnet'`).

### 10. Sitemaps & SEO
- `public/sitemap.xml` und `public/sitemap-automatisierungsberater.xml` prüfen und `/notfallkoffer`/`/auth`-Einträge entfernen, falls vorhanden.

---

## Files

```text
src/App.tsx                              EDIT  (Routen entfernen)
src/components/sections/HeroSection.tsx  EDIT
src/components/sections/KiZukunftSection.tsx     EDIT
src/components/sections/SitelinksSection.tsx     EDIT
src/components/sections/StickyCta.tsx    EDIT  (auf Potenzialanalyse)
src/components/ui/ExitIntentPopup.tsx    EDIT  (auf Potenzialanalyse)
src/components/MetaPixelRouterTracker.tsx EDIT
src/pages/Home.tsx                       EDIT  (JSON-LD sitelink raus)
src/pages/Kontakt.tsx                    EDIT  (Ziel-Logik vereinfachen)
src/pages/Admin.tsx                      EDIT  (Filter + Badges)
src/pages/AdminConversions.tsx           EDIT  (Doku bereinigen)
src/pages/Auth.tsx                       DELETE
src/pages/danke/DankeLead.tsx            DELETE
supabase/functions/send-contact-email/index.ts   EDIT
public/sitemap.xml                       EDIT (falls Eintrag drin)
public/sitemap-automatisierungsberater.xml       EDIT (falls Eintrag drin)
```

---

## Folge-Verbesserungen (ohne Rückfrage geliefert)

1. **301-Redirect statt Hard-Delete für `/notfallkoffer`:** Falls Google die URL indexiert hat oder du sie beworben hast — auf `/kontakt?ziel=potenzialanalyse` weiterleiten statt 404. (Aktuell schon als Navigate-Redirect drin → ich lasse den Redirect bestehen, statt die Route ganz zu entfernen.)
2. **Auth-Seite behalten als generische Login-Hülle**, falls du später Mitgliederbereich oder Kundendashboard planst — Texte aber neutralisieren („Zugang zu deinem Bereich" statt „Notfallkoffer"). **Default-Empfehlung: behalten + neutralisieren**, nicht löschen.
3. **Bestehende `lead_magnet`-Submissions als Historie taggen**, nicht löschen — DSGVO-konform aufbewahren bis Aufbewahrungsfrist abläuft.
4. **AVV-Register-Eintrag für Notfallkoffer-Download-Hosting prüfen**, falls da ein externer Hoster (z. B. S3, Filehost) hinterlegt war → entfernen.
5. **Memory `mem://project/conversion-funnel` aktualisieren**: Notfallkoffer raus, Potenzialanalyse als einziger Funnel.

---

## Bitte bestätige zwei Punkte vor Implementierung

1. **Auth-Seite & `/auth`-Route:** komplett löschen (mein Plan oben) ODER neutralisieren als Login-Hülle für später (Folge-Verbesserung #2)?
2. **`/notfallkoffer`-URL:** als 301-Redirect auf Potenzialanalyse behalten (sicher) ODER ersatzlos entfernen → 404?
