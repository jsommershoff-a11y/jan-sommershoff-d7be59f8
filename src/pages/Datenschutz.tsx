import { useEffect } from 'react';

export default function Datenschutz() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-24">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Datenschutzerklärung</h1>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground">

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
          <p>Diese Website verwendet technisch notwendige Cookies bzw. lokale Speichermechanismen (localStorage), um die Funktionsfähigkeit der Website sicherzustellen.</p>
          <p>Beim ersten Besuch der Website wird Ihnen ein Cookie-Banner angezeigt, über das Sie der Verwendung von Cookies zustimmen oder diese ablehnen können. Ihre Entscheidung wird im localStorage Ihres Browsers gespeichert, sodass das Banner bei erneuten Besuchen nicht erneut erscheint.</p>
          <p>Es werden keine Tracking-Cookies gesetzt und keine personenbezogenen Daten über Cookies erhoben.</p>
          <p>Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer funktionsfähigen Website) sowie – soweit eine Einwilligung erteilt wird – auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO.</p>
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

        <p className="text-sm text-muted-foreground pt-4">Stand: {new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
      </div>
    </div>
  );
}
