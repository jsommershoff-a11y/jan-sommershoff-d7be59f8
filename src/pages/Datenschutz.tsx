import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { AvvRegister } from '@/components/AvvRegister';

export default function Datenschutz() {
  useEffect(() => {
    if (window.location.hash) {
      // Hash vorhanden → smooth zum Element scrollen, nicht nach oben
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Datenschutzerklärung – Jan Sommershoff"
        description="Datenschutzerklärung gemäß DSGVO: verantwortliche Stelle, Cookies, Hosting, Tracking, Rechte der Betroffenen sowie Kontakt zum Datenschutz."
        canonicalPath="/datenschutz"
        imageAlt="Datenschutzerklärung – Jan Sommershoff"
        noIndex={false}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-foreground">Datenschutzerklärung</h1>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-5 sm:space-y-6 text-muted-foreground break-words">

        {/* 1. Verantwortlicher */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">1. Verantwortlicher für die Datenverarbeitung</h2>
          <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
          <p>
            <strong>SMB Consulting UG (haftungsbeschränkt)</strong><br />
            Westerwaldstr. 146<br />
            53773 Hennef<br />
            Deutschland
          </p>
          <p>
            Telefon: +49 175 1127114<br />
            E-Mail: <a href="mailto:j.s@jan-sommershoff.de" className="text-accent hover:underline">j.s@jan-sommershoff.de</a>
          </p>
        </section>

        {/* 2. Datenschutz auf einen Blick */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">2. Datenschutz auf einen Blick</h2>

          <h3 className="text-lg font-semibold text-foreground mt-4">Allgemeine Hinweise</h3>
          <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Datenerfassung auf dieser Website</h3>
          <p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
          <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Verantwortlicher für die Datenverarbeitung" in dieser Datenschutzerklärung entnehmen.</p>

          <p><strong>Wie erfassen wir Ihre Daten?</strong></p>
          <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>
          <p>Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).</p>
        </section>

        {/* 3. Hosting */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">3. Hosting</h2>
          <h3 className="text-lg font-semibold text-foreground mt-4">Externes Hosting</h3>
          <p>Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.</p>
          <p>Die Nutzung des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).</p>
        </section>

        {/* 4. Allgemeine Hinweise und Pflichtinformationen */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">4. Allgemeine Hinweise und Pflichtinformationen</h2>

          <h3 className="text-lg font-semibold text-foreground mt-4">Datenschutz</h3>
          <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Speicherdauer</h3>
          <p>Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Ihre Rechte</h3>
          <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Ferner steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>
        </section>

        {/* 5. SSL-/TLS-Verschlüsselung */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">5. SSL- bzw. TLS-Verschlüsselung</h2>
          <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
          <p>Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.</p>
        </section>

        {/* 6. Server-Log-Files */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">6. Server-Log-Files</h2>
          <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Files, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
          <ul className="list-disc pl-6">
            <li>Browsertyp und Browserversion</li>
            <li>verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ul>
          <p>Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
          <p>Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.</p>
        </section>

        {/* 7. Datenerfassung auf dieser Website */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">7. Datenerfassung auf dieser Website</h2>

          <h3 className="text-lg font-semibold text-foreground mt-4">Kontaktformular</h3>
          <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
          <p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Anfrage per E-Mail, Telefon oder Telefax</h3>
          <p>Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
          <p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).</p>
        </section>

        {/* 8. WhatsApp Kommunikation */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">8. WhatsApp Kommunikation (WhatsApp Business)</h2>
          <p>Wir nutzen den Dienst WhatsApp Business zur Kommunikation mit Kunden und Interessenten. Anbieter ist die WhatsApp Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland.</p>
          <p>Die Kommunikation erfolgt über eine Ende-zu-Ende-Verschlüsselung. Beachten Sie jedoch, dass WhatsApp Zugriff auf Metadaten der Kommunikation (z. B. Absender, Empfänger und Zeitpunkt) erhält. WhatsApp kann diese Daten auch auf Servern in den USA verarbeiten.</p>
          <p>Die Nutzung von WhatsApp erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können eine erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bereits erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.</p>
          <p>Weitere Informationen finden Sie in der Datenschutzerklärung von WhatsApp: <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.whatsapp.com/legal/privacy-policy</a></p>
        </section>

        {/* 9. Zahlungsabwicklung über Stripe */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">9. Zahlungsabwicklung über Stripe</h2>
          <p>Für die Abwicklung von Zahlungen nutzen wir den Zahlungsdienstleister Stripe. Anbieter ist die Stripe Payments Europe Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland.</p>
          <p>Im Rahmen der Zahlungsabwicklung werden Ihre Zahlungsdaten (z. B. Kreditkartennummer, Rechnungsadresse, E-Mail-Adresse) an Stripe übermittelt. Die Übermittlung Ihrer Daten an Stripe erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) sowie im Interesse eines sicheren und reibungslosen Zahlungsverkehrs (Art. 6 Abs. 1 lit. f DSGVO).</p>
          <p>Stripe kann Daten auch in den USA verarbeiten. Es gelten die Standardvertragsklauseln der EU-Kommission als Grundlage für die Datenübermittlung in Drittländer.</p>
          <p>Weitere Informationen finden Sie in der Datenschutzerklärung von Stripe: <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://stripe.com/de/privacy</a></p>
        </section>

        {/* 10. Cookies und Cookie-Consent */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">10. Cookies und Cookie-Consent</h2>
          <p>Beim ersten Besuch unserer Website erhalten Sie ein Cookie-Banner, über das Sie granular entscheiden können, welche Kategorien von Cookies und vergleichbaren Technologien Sie zulassen möchten. Ihre Auswahl wird in Ihrem Browser (localStorage, Schlüssel <code>cookie-consent-v2</code>) gespeichert und kann jederzeit über den Cookie-Button unten links bzw. den Footer-Link „Cookie-Einstellungen" geändert oder widerrufen werden.</p>
          <p>Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer funktionsfähigen Website) für notwendige Cookies sowie auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) für Analyse- und Marketing-Cookies. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">10.1 Notwendig (immer aktiv)</h3>
          <p>Diese Speichervorgänge sind technisch erforderlich, damit die Website funktioniert (z. B. Speicherung Ihrer Cookie-Auswahl, Sicherheits-Token, Theme-Einstellung). Sie können nicht deaktiviert werden. Es findet kein Tracking statt.</p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs sm:text-sm border border-border">
              <thead className="bg-muted/50">
                <tr className="text-left text-foreground">
                  <th className="p-2 border border-border">Name</th>
                  <th className="p-2 border border-border">Anbieter</th>
                  <th className="p-2 border border-border">Zweck</th>
                  <th className="p-2 border border-border">Speicherdauer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-border"><code>cookie-consent-v2</code></td>
                  <td className="p-2 border border-border">jan-sommershoff.de</td>
                  <td className="p-2 border border-border">Speichert Ihre Cookie-Einstellungen</td>
                  <td className="p-2 border border-border">12 Monate (localStorage)</td>
                </tr>
                <tr>
                  <td className="p-2 border border-border"><code>theme</code></td>
                  <td className="p-2 border border-border">jan-sommershoff.de</td>
                  <td className="p-2 border border-border">Speichert Ihr bevorzugtes Farbschema (Hell/Dunkel)</td>
                  <td className="p-2 border border-border">Persistent (localStorage)</td>
                </tr>
                <tr>
                  <td className="p-2 border border-border"><code>sb-*-auth-token</code></td>
                  <td className="p-2 border border-border">Supabase</td>
                  <td className="p-2 border border-border">Session-Verwaltung bei Login (nur falls Sie sich registrieren)</td>
                  <td className="p-2 border border-border">Bis Logout / 1 Stunde</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4">10.2 Analyse (optional, nur mit Einwilligung)</h3>
          <p>Mit Ihrer Einwilligung setzen wir Google Analytics 4 (GA4) ein, um anonymisiert zu messen, wie unsere Website genutzt wird (z. B. Seitenaufrufe, Verweildauer, Geräteklasse). Dies hilft uns, Inhalte und Nutzerführung zu verbessern. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. IP-Adressen werden vor jeder Verarbeitung gekürzt (IP-Anonymisierung). Eine Übermittlung in Drittländer (insb. USA) ist möglich; Grundlage sind die EU-Standardvertragsklauseln.</p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs sm:text-sm border border-border">
              <thead className="bg-muted/50">
                <tr className="text-left text-foreground">
                  <th className="p-2 border border-border">Name</th>
                  <th className="p-2 border border-border">Anbieter</th>
                  <th className="p-2 border border-border">Zweck</th>
                  <th className="p-2 border border-border">Speicherdauer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-border"><code>_ga</code></td>
                  <td className="p-2 border border-border">Google (GA4)</td>
                  <td className="p-2 border border-border">Unterscheidung von Besuchern (pseudonyme Client-ID)</td>
                  <td className="p-2 border border-border">2 Jahre</td>
                </tr>
                <tr>
                  <td className="p-2 border border-border"><code>_ga_*</code></td>
                  <td className="p-2 border border-border">Google (GA4)</td>
                  <td className="p-2 border border-border">Speichert Sitzungs- und Kampagneninformationen</td>
                  <td className="p-2 border border-border">2 Jahre</td>
                </tr>
                <tr>
                  <td className="p-2 border border-border"><code>_gid</code></td>
                  <td className="p-2 border border-border">Google (GA4)</td>
                  <td className="p-2 border border-border">Unterscheidung von Besuchern</td>
                  <td className="p-2 border border-border">24 Stunden</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2">Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://policies.google.com/privacy</a></p>

          <h3 className="text-lg font-semibold text-foreground mt-4">10.3 Marketing (optional, nur mit Einwilligung)</h3>
          <p>Mit Ihrer Einwilligung setzen wir den Meta Pixel (Facebook Pixel) ein, um die Wirksamkeit unserer Werbeanzeigen auf Facebook und Instagram zu messen (Conversion-Tracking) und Zielgruppen für Remarketing-Kampagnen zu bilden. Anbieter ist die Meta Platforms Ireland Limited, Merrion Road, Dublin 4, Irland. Eine Übermittlung von Daten an Meta in den USA ist möglich; Grundlage sind die EU-Standardvertragsklauseln.</p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-xs sm:text-sm border border-border">
              <thead className="bg-muted/50">
                <tr className="text-left text-foreground">
                  <th className="p-2 border border-border">Name</th>
                  <th className="p-2 border border-border">Anbieter</th>
                  <th className="p-2 border border-border">Zweck</th>
                  <th className="p-2 border border-border">Speicherdauer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-border"><code>_fbp</code></td>
                  <td className="p-2 border border-border">Meta (Facebook)</td>
                  <td className="p-2 border border-border">Identifiziert Browser für Werbe- und Analysezwecke</td>
                  <td className="p-2 border border-border">3 Monate</td>
                </tr>
                <tr>
                  <td className="p-2 border border-border"><code>_fbc</code></td>
                  <td className="p-2 border border-border">Meta (Facebook)</td>
                  <td className="p-2 border border-border">Speichert die letzte angeklickte Werbeanzeige (Click-ID)</td>
                  <td className="p-2 border border-border">3 Monate</td>
                </tr>
                <tr>
                  <td className="p-2 border border-border"><code>fr</code></td>
                  <td className="p-2 border border-border">Meta (Facebook)</td>
                  <td className="p-2 border border-border">Werbe-Targeting und Conversion-Messung</td>
                  <td className="p-2 border border-border">3 Monate</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2">Weitere Informationen: <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.facebook.com/privacy/policy</a></p>

          <h3 className="text-lg font-semibold text-foreground mt-4">10.4 Apollo.io Website-Tracker (B2B-Besucher-Identifikation)</h3>
          <p>Mit Ihrer Einwilligung setzen wir den <strong>Apollo.io Website-Tracker</strong> ein. Das Tool ordnet Besucher unserer Website auf Grundlage der IP-Adresse und gerätebezogener Merkmale soweit möglich Unternehmen zu (sog. Reverse-IP-Lookup) und stellt uns aggregierte Informationen zu besuchten Seiten, Verweildauer und ggf. zugeordneter Firma zur Verfügung. Ziel ist die Auswertung des Interesses geschäftlicher Besucher und die Optimierung unseres B2B-Marketings.</p>
          <p><strong>Anbieter:</strong> Apollo.io, Inc. (ehem. ZenProspect, Inc.), 535 Mission St, Suite 1100, San Francisco, CA 94105, USA.</p>
          <p><strong>Verarbeitete Daten:</strong> IP-Adresse (gekürzt für Firmen-Match), Browser- und Geräteinformationen, Referrer-URL, aufgerufene Seiten, Zeitstempel, Klick- und Scroll-Verhalten, ggf. ein Cookie/LocalStorage-Identifier zur Wiedererkennung im Verlauf der Sitzung.</p>
          <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung über unser Cookie-Banner). Ohne Einwilligung wird das Skript nicht geladen.</p>
          <p><strong>Speicherdauer:</strong> Die durch Apollo gespeicherten Daten werden gemäß den Apollo-Aufbewahrungsfristen verarbeitet (i. d. R. bis zu 24 Monate für Tracking-Profile). Lokal gesetzte Tracking-Identifier können Sie jederzeit über Ihre Browser-Einstellungen löschen.</p>
          <p><strong>Drittlandtransfer (USA):</strong> Apollo verarbeitet Daten in den USA. Grundlage des Transfers sind die <a href="https://commission.europa.eu/document/fa09cbad-dd7d-4684-ae60-be03fcb0fddf_de" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">EU-Standardvertragsklauseln</a> nach Art. 46 Abs. 2 lit. c DSGVO sowie – soweit Apollo zertifiziert ist – das <a href="https://www.dataprivacyframework.gov/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">EU-US Data Privacy Framework</a>. Es besteht das Risiko, dass US-Behörden im Einzelfall auf Daten zugreifen können, ohne dass Sie hiergegen wirksame Rechtsmittel haben.</p>
          <p><strong>Weitere Informationen:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Datenschutzerklärung Apollo: <a href="https://www.apollo.io/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.apollo.io/privacy-policy</a></li>
            <li>DPA / Auftragsverarbeitung: <a href="https://www.apollo.io/dpa" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.apollo.io/dpa</a> · <a href="#avv-apollo" className="text-accent hover:underline">Eintrag im AVV-Register ↓</a></li>
            <li>Opt-out Apollo: <a href="https://www.apollo.io/cookie-settings" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.apollo.io/cookie-settings</a></li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4">10.5 Google Consent Mode v2</h3>
          <p>Wir setzen den <strong>Google Consent Mode v2</strong> ein. Das bedeutet: Google-Tags (insbesondere Google Analytics 4 und – falls aktiviert – Google Ads) werden auf unserer Website grundsätzlich mit dem Standardstatus „<strong>denied</strong>" für die Signale <code>ad_storage</code>, <code>ad_user_data</code>, <code>ad_personalization</code> und <code>analytics_storage</code> geladen. Erst nach Ihrer aktiven Einwilligung im Cookie-Banner werden die jeweils freigegebenen Signale per <code>consent update</code> auf „granted" gesetzt.</p>
          <p>Ohne Ihre Einwilligung werden <strong>keine Cookies gesetzt</strong> und <strong>keine identifizierenden Daten</strong> übertragen. Es können in diesem Modus jedoch sogenannte <em>cookielose Pings</em> (anonyme, aggregierte Signale ohne Geräte- oder Nutzer-IDs) an Google gesendet werden, die ausschließlich der statistischen Modellierung von Conversion- und Reichweiten-Lücken dienen. Eine Wiedererkennung Ihrer Person ist auf dieser Basis nicht möglich.</p>
          <p>Zusätzlich aktivieren wir die Google-Einstellungen <code>ads_data_redaction</code> (Schwärzung werbebezogener Daten bei fehlender Einwilligung) und <code>url_passthrough</code> (cookielose Weitergabe von Klick-Parametern).</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">10.6 Widerruf Ihrer Einwilligung</h3>
          <p>Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen oder anpassen. Klicken Sie dazu auf den Cookie-Button (Symbol unten links auf jeder Seite) oder auf den Link „Cookie-Einstellungen" im Footer. Nach Widerruf werden die zugehörigen Skripte nicht mehr geladen; bereits gesetzte Drittanbieter-Cookies können Sie zusätzlich in den Einstellungen Ihres Browsers löschen.</p>
        </section>

        {/* 11. Plugins und Tools */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">11. Plugins und Tools</h2>

          <h3 className="text-lg font-semibold text-foreground mt-4">Google Fonts (lokales Hosting)</h3>
          <p>Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die von Google bereitgestellt werden. Die Google Fonts sind lokal installiert. Eine Verbindung zu Servern von Google findet dabei nicht statt.</p>
        </section>

        {/* 12. Digitale Immobilien-Analyse */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">12. Nutzung der digitalen Immobilien-Analyse und Beratungsweiterleitung</h2>
          <p>Auf unserer Website bieten wir eine digitale Analysefunktion an, mit der Nutzer unverbindlich ihre Investitionsziele im Bereich Kapitalanlage-Immobilien strukturieren können.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Art der verarbeiteten Daten</h3>
          <p>Während der Nutzung der Analysefunktion werden ausschließlich inhaltliche Angaben zu Investitionszielen, Präferenzen und Rahmenbedingungen verarbeitet. Es ist nicht erforderlich, personenbezogene Daten anzugeben, um die Analyse vollständig zu nutzen.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Zweck der Verarbeitung</h3>
          <p>Die Verarbeitung erfolgt ausschließlich zum Zweck der inhaltlichen Analyse und Entscheidungsunterstützung für den Nutzer. Eine Speicherung oder Zuordnung zu einer identifizierbaren Person findet nicht statt.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Keine automatische Datenspeicherung oder Weitergabe</h3>
          <p>Die im Rahmen der Analyse eingegebenen Inhalte werden nicht dauerhaft gespeichert, nicht mit personenbezogenen Daten verknüpft und nicht automatisch an die SMB Consulting UG (haftungsbeschränkt) oder Dritte übermittelt.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Freiwillige Weiterleitung zur Beratung</h3>
          <p>Am Ende der Analyse besteht für Nutzer die freiwillige Möglichkeit, sich für eine persönliche Beratung zu entscheiden. Erst nach einer aktiven Entscheidung des Nutzers erfolgt eine Weiterleitung auf eine externe Seite.</p>
          <p>Die Angabe von Kontaktdaten erfolgt:</p>
          <ul className="list-disc pl-6">
            <li>ausschließlich freiwillig</li>
            <li>nur nach expliziter Zustimmung</li>
            <li>nur zum Zweck der individuellen Immobilienberatung</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4">Externe Seiten und Datenverarbeitung</h3>
          <p>Sofern Nutzer sich für eine Beratung entscheiden, werden sie auf eine externe Projekt- bzw. Formularseite weitergeleitet. Die dortige Datenverarbeitung erfolgt gemäß der jeweils dort ausgewiesenen Datenschutzerklärung.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Tracking und Auswertung</h3>
          <p>Zur Verbesserung der Nutzerführung können anonyme, aggregierte Ereignisse erfasst werden. Dabei werden:</p>
          <ul className="list-disc pl-6">
            <li>keine Cookies gesetzt</li>
            <li>keine personenbezogenen Daten verarbeitet</li>
            <li>keine Nutzerprofile erstellt</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4">Rechtsgrundlage</h3>
          <p>Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) sowie – im Fall der freiwilligen Kontaktaufnahme – gemäß Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Wahlfreiheit des Nutzers</h3>
          <p>Die Nutzung der Analysefunktion ist jederzeit ohne Angabe personenbezogener Daten möglich. Die Entscheidung für oder gegen eine Beratung hat keinen Einfluss auf die Nutzung der Analyse.</p>
        </section>

        {/* 13. Klarheits- und Entscheidungsanalyse */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">13. Nutzung der Klarheits- und Entscheidungsanalyse</h2>
          <p>Auf unserer Website kann eine digitale Klarheits- und Entscheidungsanalyse genutzt werden. Diese dient ausschließlich der persönlichen Orientierung, Reflexion und Entscheidungsunterstützung.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Art der Datenerhebung</h3>
          <p>Im Rahmen der Analyse werden ausschließlich solche Angaben verarbeitet, die für die inhaltliche Auswertung erforderlich sind. Die Nutzung der Analyse erfolgt grundsätzlich anonym. Es werden keine personenbezogenen Kontaktdaten erhoben oder gespeichert.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Zweck der Verarbeitung</h3>
          <p>Die Verarbeitung der eingegebenen Informationen erfolgt ausschließlich zum Zweck der inhaltlichen Analyse und Darstellung von Ergebnissen für den jeweiligen Nutzer.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Keine automatische Weitergabe</h3>
          <p>Die im Rahmen der Analyse eingegebenen Inhalte oder Ergebnisse werden nicht automatisch gespeichert, nicht weitergeleitet und nicht an Dritte übermittelt.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Freiwillige Kontaktaufnahme</h3>
          <p>Nach Abschluss der Analyse besteht für Nutzer die freiwillige Möglichkeit, sich über eine separate Seite über ein persönliches Informationsgespräch zu informieren. Erst im Rahmen dieser freiwilligen Kontaktaufnahme können personenbezogene Daten erhoben werden.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Rechtsgrundlage</h3>
          <p>Die Verarbeitung personenbezogener Daten im Rahmen einer Kontaktaufnahme erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Keine Profilbildung</h3>
          <p>Es findet keine automatisierte Entscheidungsfindung, kein Profiling und keine Bewertung im rechtlichen Sinne statt.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Freiwilligkeit</h3>
          <p>Die Entscheidung zur Nutzung der Analyse sowie zu einer späteren Kontaktaufnahme liegt jederzeit vollständig beim Nutzer. Die Nutzung der Website und der Analyse ist auch ohne Kontaktaufnahme uneingeschränkt möglich.</p>
        </section>

        {/* Kontakt & Datenschutz-Links */}
        <section className="mt-8 rounded-lg border border-border bg-muted/30 p-5 sm:p-6 not-prose">
          <h2 className="text-xl font-semibold text-foreground mb-3">Kontakt zum Datenschutz</h2>
          <p className="mb-4">
            Bei Fragen zum Datenschutz, zur Verarbeitung Ihrer Daten oder zur Ausübung Ihrer Rechte (Auskunft, Berichtigung, Löschung, Widerruf) erreichen Sie uns jederzeit:
          </p>
          <ul className="list-none pl-0 space-y-2">
            <li>
              <strong className="text-foreground">E-Mail:</strong>{' '}
              <a href="mailto:j.s@jan-sommershoff.de" className="text-accent hover:underline">
                j.s@jan-sommershoff.de
              </a>
            </li>
            <li>
              <strong className="text-foreground">Telefon:</strong>{' '}
              <a href="tel:+491751127114" className="text-accent hover:underline">
                +49 175 1127114
              </a>
            </li>
            <li>
              <strong className="text-foreground">Kontaktformular:</strong>{' '}
              <Link to="/kontakt" className="text-accent hover:underline">
                /kontakt
              </Link>
            </li>
            <li>
              <strong className="text-foreground">Cookie-Einstellungen:</strong>{' '}
              jederzeit über den Cookie-Button unten links änderbar
            </li>
          </ul>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Zum Kontaktformular
            </Link>
            <a
              href="mailto:j.s@jan-sommershoff.de"
              className="inline-flex items-center justify-center rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              E-Mail schreiben
            </a>
          </div>

          <p className="mt-4 text-sm">
            Weitere rechtliche Hinweise:{' '}
            <Link to="/impressum" className="text-accent hover:underline">Impressum</Link>
            {' · '}
            <Link to="/agb" className="text-accent hover:underline">AGB</Link>
          </p>
        </section>

        <p className="text-sm text-muted-foreground pt-4">Stand: {new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
      </div>
      </div>
    </>
  );
}
