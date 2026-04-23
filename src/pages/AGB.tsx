import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';

export default function AGB() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEOHead
        title="AGB – Allgemeine Geschäftsbedingungen"
        description="Allgemeine Geschäftsbedingungen der SMB Consulting UG (haftungsbeschränkt) für KI-Beratung, Automatisierung und Workshops."
        canonicalPath="/agb"
        imageAlt="Allgemeine Geschäftsbedingungen – SMB Consulting UG"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-foreground">Allgemeine Geschäftsbedingungen (AGB)</h1>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-5 sm:space-y-6 text-muted-foreground break-words">
        <p>Stand: März 2025</p>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§ 1 Geltungsbereich</h2>
          <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Geschäftsbeziehungen zwischen der SMB Consulting UG (haftungsbeschränkt), Westerwaldstr. 146, 53773 Hennef (nachfolgend „Anbieter") und dem Kunden (nachfolgend „Auftraggeber").</p>
          <p>Abweichende Bedingungen des Auftraggebers werden nur anerkannt, wenn der Anbieter diesen ausdrücklich schriftlich zugestimmt hat.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§ 2 Vertragsgegenstand</h2>
          <p>Gegenstand des Vertrages sind Beratungsleistungen, strategische Analysen, digitale Dienstleistungen sowie die Konzeption und Umsetzung von Projekten im Bereich Unternehmensberatung, Immobilienberatung und KI-gestützter Geschäftsprozesse.</p>
          <p>Der genaue Leistungsumfang ergibt sich aus der jeweiligen Leistungsbeschreibung, dem Angebot oder der individuellen Vereinbarung.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§ 3 Vertragsschluss</h2>
          <p>Ein Vertrag kommt zustande durch die schriftliche Auftragsbestätigung des Anbieters oder durch die tatsächliche Erbringung der Leistung. Angebote des Anbieters sind freibleibend und unverbindlich, sofern nicht ausdrücklich anders angegeben.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§ 4 Leistungen und Beratung</h2>
          <p>Der Anbieter erbringt seine Leistungen nach bestem Wissen und Gewissen auf Grundlage der vom Auftraggeber bereitgestellten Informationen.</p>
          <p>Beratungsleistungen stellen keine rechtsverbindlichen Empfehlungen dar. Die Umsetzung von Empfehlungen erfolgt eigenverantwortlich durch den Auftraggeber.</p>
          <p>Der Anbieter schuldet eine fachgerechte Durchführung der vereinbarten Leistung, jedoch keinen bestimmten wirtschaftlichen Erfolg.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§ 5 Vergütung und Zahlung</h2>
          <p>Die Vergütung richtet sich nach der individuellen Vereinbarung oder dem jeweiligen Angebot. Alle Preise verstehen sich, sofern nicht anders angegeben, als Nettopreise zuzüglich der gesetzlichen Umsatzsteuer.</p>
          <p>Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zur Zahlung fällig, sofern nicht anders vereinbart.</p>
          <p>Bei Zahlungsverzug ist der Anbieter berechtigt, Verzugszinsen in gesetzlicher Höhe zu berechnen.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§ 6 Haftung</h2>
          <p>Der Anbieter haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie für vorsätzlich oder grob fahrlässig verursachte Schäden.</p>
          <p>Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten). Die Haftung ist in diesem Fall auf den vorhersehbaren, vertragstypischen Schaden begrenzt.</p>
          <p>Die Haftung für mittelbare Schäden, insbesondere entgangenen Gewinn, ist bei leichter Fahrlässigkeit ausgeschlossen.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§ 7 Widerrufsrecht für Verbraucher</h2>
          <p>Sofern der Auftraggeber Verbraucher im Sinne des § 13 BGB ist und der Vertrag im Fernabsatz oder außerhalb von Geschäftsräumen geschlossen wurde, steht dem Auftraggeber ein Widerrufsrecht gemäß den gesetzlichen Bestimmungen zu.</p>
          <p><strong>Widerrufsbelehrung:</strong></p>
          <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.</p>
          <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung (z. B. per E-Mail an <a href="mailto:j.s@jan-sommershoff.de" className="text-accent hover:underline">j.s@jan-sommershoff.de</a> oder per Post) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
          <p>Zur Wahrung der Widerrufsfrist genügt es, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.</p>
          <p><strong>Folgen des Widerrufs:</strong></p>
          <p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§ 8 Datenschutz</h2>
          <p>Der Anbieter verarbeitet personenbezogene Daten des Auftraggebers gemäß den geltenden datenschutzrechtlichen Bestimmungen. Einzelheiten entnehmen Sie bitte unserer{' '}
            <Link to="/datenschutz" className="text-accent hover:underline">Datenschutzerklärung</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">§ 9 Schlussbestimmungen</h2>
          <p>Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.</p>
          <p>Ist der Auftraggeber Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist Gerichtsstand für alle Streitigkeiten aus dem Vertragsverhältnis Köln.</p>
          <p>Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Anstelle der unwirksamen Bestimmung gilt eine wirksame Regelung, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.</p>
        </section>
      </div>
      </div>
    </>
  );
}
