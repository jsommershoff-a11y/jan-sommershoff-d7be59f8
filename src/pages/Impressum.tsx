import { useEffect } from 'react';

export default function Impressum() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-24">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Impressum</h1>
      
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Angaben gemäß § 5 TMG</h2>
          <p><strong>SMB Consulting UG (haftungsbeschränkt)</strong></p>
          <p>Westerwaldstr. 146<br />53773 Hennef<br />Deutschland</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Vertreten durch den Geschäftsführer</h2>
          <p>Jan Sommershoff</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Kontakt</h2>
          <p>Telefon: +49 175 1127114<br />E-Mail: <a href="mailto:j.s@jan-sommershoff.de" className="text-accent hover:underline">j.s@jan-sommershoff.de</a></p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Registereintrag</h2>
          <p>Eintragung im Handelsregister<br />Registergericht: Amtsgericht Köln<br />Registernummer: HRB 114170</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Umsatzsteuer-ID</h2>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />DE121862927</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Verantwortlich für den Inhalt nach §55 Abs. 2 RStV</h2>
          <p>Jan Sommershoff<br />Westerwaldstr. 146<br />53773 Hennef</p>
        </section>
      </div>
    </div>
  );
}
