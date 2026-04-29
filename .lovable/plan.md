# Plan: Domain-Tausch ki-automationen.io → jan.dein-automatisierungsberater.de

## Ja, das klappt — aber zwei getrennte Themen

### 1. Code-Änderung (mache ich)
Die alte Domain ist an genau **2 Stellen** im Code verlinkt (Menüpunkt "Automatisierungen"):

| Datei | Zeile | Alt | Neu |
|---|---|---|---|
| `src/components/layout/Header.tsx` | 26 | `https://ki-automationen.io/automatisierungen` | `https://jan.dein-automatisierungsberater.de/automatisierungen` |
| `src/data/siteData.ts` | 85 | `https://ki-automationen.io/automatisierungen` | `https://jan.dein-automatisierungsberater.de/automatisierungen` |

Beide werden im selben Schritt ersetzt.

### 2. DNS / Subdomain-Setup (musst du machen)
Damit `jan.dein-automatisierungsberater.de/automatisierungen` tatsächlich erreichbar ist, muss die **Subdomain `jan`** existieren und auf das Projekt zeigen, das die `/automatisierungen`-Seite liefert.

**Aktuell verbunden** (laut Lovable-Domains): nur `dein-automatisierungsberater.de`, `www.dein-automatisierungsberater.de`, `jan-sommershoff.de`.
→ `jan.dein-automatisierungsberater.de` ist **noch nicht angebunden**.

**Was du tun musst:**
1. **Project Settings → Domains → Connect Domain** → `jan.dein-automatisierungsberater.de` eingeben
2. DNS beim Registrar: A-Record `jan` → `185.158.133.1` (+ TXT `_lovable` wie angezeigt)
3. Sicherstellen, dass auf der Subdomain auch eine Route `/automatisierungen` existiert (entweder dieses Projekt mit angepasster Route, oder ein separates Projekt für Jan-Persönlich)

**Wichtig:** Wenn `jan.dein-automatisierungsberater.de` ein **separates** Lovable-Projekt sein soll (Personal Brand getrennt von Beratungs-Brand), muss dort die `/automatisierungen`-Seite gebaut werden — das ist nicht Teil dieses Codeschritts.

## Offene Frage
Zeigt `jan.dein-automatisierungsberater.de` auf **dieses** Projekt (gleiche Inhalte, nur andere Subdomain) oder auf ein **separates** Projekt? Für den Linktausch im Code ist die Antwort egal — für die Frage, ob der Link am Ende funktioniert, entscheidend.

## Nicht Teil dieses Plans
- Redirects von `ki-automationen.io` selbst (das ist DNS/Registrar-Sache der alten Domain, nicht in diesem Repo konfigurierbar)
- Anlegen einer neuen `/automatisierungen`-Seite in diesem Projekt
