import { useEffect } from 'react';

/**
 * BlankPage – einfache Vorlage für neue Inhaltsseiten.
 *
 * Verwendung:
 *  1. Diese Datei kopieren und umbenennen (z.B. `MeineSeite.tsx`).
 *  2. Titel, Beschreibung und Inhalt anpassen.
 *  3. In `src/App.tsx` als Route einbinden, z.B.:
 *       <Route path="/meine-seite" element={<Layout><MeineSeite /></Layout>} />
 */
export default function BlankPage() {
  return (
    <>
      <Helmet>
        <title>Neue Seite | Jan Sommershoff</title>
        <meta
          name="description"
          content="Kurzbeschreibung der Seite (max. 160 Zeichen) für SEO."
        />
      </Helmet>

      <article className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        <header className="mb-10 md:mb-14">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Seitentitel
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Kurze Einleitung oder Untertitel der Seite.
          </p>
        </header>

        <section className="prose prose-invert max-w-none space-y-6 text-foreground/90">
          {/* Inhalt hier einfügen */}
          <p>
            Hier kommt dein Inhalt. Diese Vorlage nutzt das bestehende Layout
            mit Header und Footer und folgt dem Design-System (Farben, Spacing,
            Typografie).
          </p>
        </section>
      </article>
    </>
  );
}
