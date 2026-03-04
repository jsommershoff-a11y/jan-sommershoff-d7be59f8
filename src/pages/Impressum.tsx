import { useEffect } from 'react';

export default function Impressum() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-24">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Impressum</h1>
      
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Angaben gemäß § 5 TMG</h2>
          <p><strong>KRS Immobilien GmbH</strong></p>
          <p>Westerwaldstr. 146<br />53773 Hennef<br />Deutschland</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Vertreten durch</h2>
          <p>Geschäftsführer: Jan Sommershoff, Yannick Müller</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Kontakt</h2>
          <p>Telefon: +49 (0) 2248 9249907<br />E-Mail: anfrage@krsimmobilien.de</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Registereintrag</h2>
          <p>Eintragung im Handelsregister<br />Registergericht: Amtsgericht Siegburg<br />Registernummer: HRB 18532</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Umsatzsteuer-ID</h2>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />DE224477392</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Aufsichtsbehörde</h2>
          <p>Gewerbeaufsichtsamt Rhein-Sieg-Kreis</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>Jan Sommershoff, Yannick Müller<br />Westerwaldstr. 146<br />53773 Hennef</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">EU-Streitschlichtung</h2>
          <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
          <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Haftung für Inhalte</h2>
          <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Haftung für Links</h2>
          <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Urheberrecht</h2>
          <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
        </section>
      </div>
    </div>
  );
}
