import { useEffect } from 'react';

export default function Datenschutz() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-24">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Datenschutzerklärung</h1>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground">1. Datenschutz auf einen Blick</h2>
          
          <h3 className="text-lg font-semibold text-foreground mt-4">Allgemeine Hinweise</h3>
          <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Datenerfassung auf dieser Website</h3>
          <p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
          <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.</p>
          
          <p><strong>Wie erfassen wir Ihre Daten?</strong></p>
          <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">2. Hosting</h2>
          <h3 className="text-lg font-semibold text-foreground mt-4">Externes Hosting</h3>
          <p>Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">3. Allgemeine Hinweise und Pflichtinformationen</h2>
          
          <h3 className="text-lg font-semibold text-foreground mt-4">Datenschutz</h3>
          <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Hinweis zur verantwortlichen Stelle</h3>
          <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
          <p><strong>SMB Consulting UG (haftungsbeschränkt)</strong><br />Westerwaldstr. 146<br />53773 Hennef<br />Deutschland</p>
          <p>Telefon: +49 175 1127114<br />E-Mail: info@krsimmobilien.de</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Speicherdauer</h3>
          <p>Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Ihre Rechte</h3>
          <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen.</p>
          <p>Stand: 11.12.2025</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">4. Datenerfassung auf dieser Website</h2>
          
          <h3 className="text-lg font-semibold text-foreground mt-4">Kontaktformular</h3>
          <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Anfrage per E-Mail, Telefon oder Telefax</h3>
          <p>Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">5. Plugins und Tools</h2>
          
          <h3 className="text-lg font-semibold text-foreground mt-4">Google Fonts (lokales Hosting)</h3>
          <p>Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die von Google bereitgestellt werden. Die Google Fonts sind lokal installiert. Eine Verbindung zu Servern von Google findet dabei nicht statt.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Nutzung der digitalen Immobilien-Analyse und Beratungsweiterleitung</h2>
          <p>Auf unserer Website bieten wir eine digitale Analysefunktion an, mit der Nutzer unverbindlich ihre Investitionsziele im Bereich Kapitalanlage-Immobilien strukturieren können.</p>
          
          <h3 className="text-lg font-semibold text-foreground mt-4">1. Art der verarbeiteten Daten</h3>
          <p>Während der Nutzung der Analysefunktion werden ausschließlich inhaltliche Angaben zu Investitionszielen, Präferenzen und Rahmenbedingungen verarbeitet. Es ist nicht erforderlich, personenbezogene Daten anzugeben, um die Analyse vollständig zu nutzen.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">2. Zweck der Verarbeitung</h3>
          <p>Die Verarbeitung erfolgt ausschließlich zum Zweck der inhaltlichen Analyse und Entscheidungsunterstützung für den Nutzer. Eine Speicherung oder Zuordnung zu einer identifizierbaren Person findet nicht statt.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">3. Keine automatische Datenspeicherung oder Weitergabe</h3>
          <p>Die im Rahmen der Analyse eingegebenen Inhalte werden nicht dauerhaft gespeichert, nicht mit personenbezogenen Daten verknüpft und <p>Die im Rahmen der Analyse eingegebenen Inhalte werden nicht dauerhaft gespeichert, nicht mit personenbezogenen Daten verknüpft und nicht automatisch an die SMB Consulting UG (haftungsbeschränkt) oder Dritte übermittelt.</p></p>

          <h3 className="text-lg font-semibold text-foreground mt-4">4. Freiwillige Weiterleitung zur Beratung</h3>
          <p>Am Ende der Analyse besteht für Nutzer die freiwillige Möglichkeit, sich für eine persönliche Beratung zu entscheiden. Erst nach einer aktiven Entscheidung des Nutzers erfolgt eine Weiterleitung auf eine externe Seite.</p>
          <p>Die Angabe von Kontaktdaten erfolgt:</p>
          <ul className="list-disc pl-6">
            <li>ausschließlich freiwillig</li>
            <li>nur nach expliziter Zustimmung</li>
            <li>nur zum Zweck der individuellen Immobilienberatung</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4">5. Externe Seiten und Datenverarbeitung</h3>
          <p>Sofern Nutzer sich für eine Beratung entscheiden, werden sie auf eine externe Projekt- bzw. Formularseite weitergeleitet. Die dortige Datenverarbeitung erfolgt gemäß der jeweils dort ausgewiesenen Datenschutzerklärung.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">6. Tracking und Auswertung</h3>
          <p>Zur Verbesserung der Nutzerführung können anonyme, aggregierte Ereignisse erfasst werden. Dabei werden:</p>
          <ul className="list-disc pl-6">
            <li>keine Cookies gesetzt</li>
            <li>keine personenbezogenen Daten verarbeitet</li>
            <li>keine Nutzerprofile erstellt</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4">7. Rechtsgrundlage</h3>
          <p>Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) sowie – im Fall der freiwilligen Kontaktaufnahme – gemäß Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">8. Wahlfreiheit des Nutzers</h3>
          <p>Die Nutzung der Analysefunktion ist jederzeit ohne Angabe personenbezogener Daten möglich. Die Entscheidung für oder gegen eine Beratung hat keinen Einfluss auf die Nutzung der Analyse.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Nutzung der Klarheits- und Entscheidungsanalyse</h2>
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
      </div>
    </div>
  );
}
