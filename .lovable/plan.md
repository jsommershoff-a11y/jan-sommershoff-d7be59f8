

# Conversion-Optimierung: Persönlichkeit, Trust & Instagram

## Recherche-Ergebnis: Abschluss Wirtschaftspsychologie

Wirtschaftspsychologie wird je nach Hochschule sowohl als **Bachelor of Arts (B.A.)** als auch als **Bachelor of Science (B.Sc.)** vergeben. Bitte teile mir mit, welchen Abschluss du genau hast, damit wir das korrekt darstellen.

---

## Analyse: Was der Seite aktuell fehlt

Die Seite erzählt eine starke Comeback-Story, aber es fehlen **persönliche Verankerungspunkte**, die den Besucher emotional binden. Aktuell wirkt Jan als "Unternehmer-Figur" -- aber nicht als greifbarer Mensch mit Familie und akademischem Fundament. Ausserdem fehlen **externe Trust-Signale** (Bewertungen, Social Proof von Dritten) und Instagram ist nur als kleines Icon im Footer versteckt.

---

## Konkrete Massnahmen (7 Punkte)

### 1. Neue Sektion: "Über mich -- Auf einen Blick" (Persönliche Fakten-Leiste)

**Position:** Direkt unter der Story-Sektion, als kompakte visuelle Zusammenfassung.

Vier bis fünf Fakten-Karten in einer horizontalen Leiste:
- Mitte 30 / Familienvater von zwei Kindern
- 10+ Jahre Partnerschaft
- Wirtschaftspsychologie (B.A. oder B.Sc. -- zu klären)
- Unternehmer seit X Jahren
- Standort Deutschland

**Warum:** Persönliche Fakten schaffen sofort Nahbarkeit und Identifikation. Besucher denken: "Der ist wie ich -- Familie, Verantwortung, echtes Leben." Das ist ein massiver Trust-Hebel, der aktuell komplett fehlt.

**Design:** Minimalistisch, Icons + kurzer Text, auf dunklem oder leicht getöntem Hintergrund. Keine Karten-Schatten, sondern clean und schnell scannbar.

### 2. Story-Sektion: Persönliche Details einweben

In `siteData.story.paragraphs` werden zwei bis drei neue Absätze eingefügt, die die persönlichen Hintergründe natürlich in die Erzählung integrieren:
- Studium der Wirtschaftspsychologie als Fundament für Entscheidungsverständnis
- Familie als Antrieb und Verantwortung hinter dem Comeback
- "Als Vater von zwei Kindern weiss ich, was auf dem Spiel steht."

**Warum:** Persönliche Details gehören in die Story, nicht nur in eine Fakten-Box. Sie machen die Comeback-Erzählung glaubwürdiger.

### 3. Neue Sektion: Testimonials / Bewertungen

**Position:** Zwischen Expertise und KI-Zukunft (oder zwischen Story und Philosophy).

Eine Testimonial-Sektion mit:
- Platzhalter-Struktur für Google-Bewertungen oder persönliche Referenzen
- Sterne-Bewertung visuell dargestellt
- Zitat + Name + Rolle/Branche
- Optional: Google-Reviews-Badge oder Link zu Google-Profil

**Anfangs mit zwei bis drei handverlesenen Zitaten** (von echten Kunden/Partnern). Später erweiterbar durch Google Reviews API.

**Warum:** Externe Stimmen sind der stärkste Trust-Faktor. Aktuell spricht auf der gesamten Seite nur Jan selbst. Ein einziges echtes Testimonial wiegt mehr als zehn Selbstaussagen.

### 4. Instagram-Integration: Prominenter Feed-Teaser

**Position:** Eigene Mini-Sektion vor dem Kontakt-Bereich.

- Überschrift: "Folge meinem Weg auf Instagram"
- Drei bis vier aktuelle Instagram-Posts als statische Bild-Kacheln (manuell gepflegt oder per Embed)
- Prominenter "Auf Instagram folgen" Button mit Instagram-Branding
- Follower-Zahl als Social-Proof-Element (falls relevant)

**Warum:** Instagram ist aktuell nur ein 20px-Icon im Footer. Wenn Instagram ein aktiver Kanal ist, muss er sichtbar sein. Social-Media-Follower sind ein Trust-Signal.

### 5. Trust-Leiste erweitern (SocialProofSection)

Aktuelle Stats um persönliche/akademische Elemente ergänzen:
- "Wirtschaftspsychologie-Studium" (mit Graduation Cap Icon)
- Bestehende Zahlen bleiben

**Warum:** Der akademische Hintergrund unterscheidet Jan von reinen "Erfahrungs-Coaches" und gibt dem psychologischen Ansatz Substanz.

### 6. PersonalContactSection: Persönliche Note verstärken

Im bestehenden Text unter dem Portrait ergänzen:
- "Als Familienvater und Unternehmer kenne ich den Druck, unter dem du stehst."
- Das schafft eine direkte Brücke zwischen der persönlichen Identität und dem Hilfsangebot.

### 7. Navbar / Header: Instagram-Icon sichtbar machen

Falls eine Navbar existiert (oder im Header-Bereich): Instagram-Icon neben dem Logo oder als floating Social-Bar am Seitenrand platzieren, damit der Kanal auf jeder Scroll-Tiefe erreichbar ist.

---

## Umsetzungsreihenfolge

1. `siteData.ts` um persönliche Daten erweitern (Bio-Fakten, Testimonial-Daten)
2. Neue Komponente `PersonalFactsSection.tsx` erstellen
3. Story-Sektion-Texte anpassen
4. Neue Komponente `TestimonialsSection.tsx` erstellen (mit Platzhalter-Daten)
5. Neue Komponente `InstagramSection.tsx` erstellen
6. `SocialProofSection` um Studium-Fakt erweitern
7. `PersonalContactSection` Text anpassen
8. `Home.tsx` Sektionen einfügen und Transitions anpassen
9. Optional: Instagram-Icon in Sticky-Header einbauen

---

## Offene Frage

Bitte kläre: **Bachelor of Arts (B.A.) oder Bachelor of Science (B.Sc.)?** -- beides ist bei Wirtschaftspsychologie möglich, je nach Hochschule.

Hast du bereits **Testimonials oder Google-Bewertungen**, die wir einbauen können? Falls nicht, erstelle ich eine Platzhalter-Struktur, die du später mit echten Zitaten füllen kannst.

