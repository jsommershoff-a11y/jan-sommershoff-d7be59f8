

# Datenschutzerklärung vollständig aktualisieren

## Überblick
Die bestehende Datenschutzseite wird um die geforderten Pflichtabschnitte ergänzt und sauber neu strukturiert. Der Cookie-Banner verweist bereits korrekt auf `/datenschutz` — kein Link zu `lovable.dev/privacy` vorhanden.

## Änderungen

### `src/pages/Datenschutz.tsx`
Komplette Neustrukturierung mit folgenden Abschnitten (bestehende Inhalte bleiben erhalten, neue werden eingefügt):

1. **Verantwortlicher** — SMB Consulting UG mit vollständigen Kontaktdaten (ersetzt bisherigen Abschnitt 3 "Hinweis zur verantwortlichen Stelle")
2. **Datenschutz auf einen Blick** — bestehend, beibehalten
3. **Hosting** — bestehend, beibehalten
4. **Allgemeine Hinweise und Pflichtinformationen** — Datenschutz, Speicherdauer, Ihre Rechte (bestehend)
5. **SSL-/TLS-Verschlüsselung** — **NEU**: Hinweis auf verschlüsselte Übertragung
6. **Server-Log-Files** — **NEU**: Beschreibung der automatisch erhobenen Server-Daten (IP, Browser, Zeitstempel etc.), Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO
7. **Datenerfassung auf dieser Website**
   - Kontaktformular (bestehend)
   - Anfrage per E-Mail/Telefon (bestehend)
8. **WhatsApp Kommunikation** — **NEU**: Hinweis auf WhatsApp Business, Datenweitergabe an Meta/WhatsApp, Freiwilligkeit, Rechtsgrundlage Art. 6 Abs. 1 lit. a DSGVO
9. **Zahlungsabwicklung über Stripe** — **NEU**: Stripe Payments Europe Ltd., Irland; Weitergabe von Zahlungsdaten, Verweis auf Stripe-Datenschutz, Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO
10. **Cookies und Cookie-Consent** — **NEU**: Beschreibung technisch notwendiger Cookies, Verweis auf Cookie-Banner, localStorage-Speicherung der Einwilligung, Rechtsgrundlage
11. **Plugins und Tools** — Google Fonts lokal (bestehend)
12. **Digitale Immobilien-Analyse** — bestehend, beibehalten
13. **Klarheits- und Entscheidungsanalyse** — bestehend, beibehalten

### Keine Änderung an `CookieBanner.tsx`
Der Banner verlinkt bereits korrekt auf `/datenschutz`.

