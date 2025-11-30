export default function Datenschutz() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
          Datenschutzerklärung
        </h1>

        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          <section>
            <p className="text-sm text-gray-600 mb-6">
              <strong>Stand:</strong> {new Date().toLocaleDateString('de-AT')}
            </p>
            <p>
              Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. 
              Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) 
              erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne 
              Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
            </p>
            <p>
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) 
              Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              1. Verantwortlicher
            </h2>
            <div className="space-y-2">
              <p>
                <strong>Verantwortlicher für die Datenverarbeitung:</strong>
              </p>
              <p>
                Innenausbauberisha KG<br />
                Einzelunternehmen<br />
                Favoritenstraße 155 22-24<br />
                1100 Wien<br />
                Österreich
              </p>
              <p>
                <strong>Vertreten durch:</strong> Miftar Berisha
              </p>
              <p>
                <strong>Kontakt:</strong><br />
                Telefon: +436641325995<br />
                E-Mail: innenausbauberisha-kg@hotmail.com
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              2. Datenerfassung auf dieser Website
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  2.1 Kontaktformular
                </h3>
                <p>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular 
                  inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall 
                  von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
                <p className="mt-2">
                  <strong>Rechtsgrundlage:</strong> Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt 
                  auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO 
                  (berechtigtes Interesse an der Beantwortung Ihrer Anfrage).
                </p>
                <p className="mt-2">
                  <strong>Speicherdauer:</strong> Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, 
                  bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für 
                  die Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende 
                  gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  2.2 Server-Log-Dateien
                </h3>
                <p>
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, 
                  die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Browsertyp und Browserversion</li>
                  <li>verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p className="mt-2">
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser 
                  Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes 
                  Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              3. Cookies
            </h2>
            <p>
              Diese Website nutzt teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und 
              enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. 
              Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
            </p>
            <p className="mt-2">
              Die meisten der von uns verwendeten Cookies sind so genannte "Session-Cookies". Sie werden nach Ende Ihres 
              Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. 
              Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.
            </p>
            
            <div className="mt-4 space-y-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  3.1 Notwendige Cookies
                </h3>
                <p>
                  Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden. 
                  Sie werden in der Regel nur als Reaktion auf von Ihnen durchgeführte Aktionen gesetzt, die einer 
                  Dienstanfrage gleichkommen, wie z.B. das Festlegen Ihrer Datenschutzeinstellungen, das Anmelden oder 
                  das Ausfüllen von Formularen.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  3.2 Externe Dienste (Google)
                </h3>
                <p>
                  <strong>Google reCAPTCHA:</strong> Wir verwenden den Dienst "reCAPTCHA" der Firma Google Ireland Limited, 
                  Gordon House, Barrow Street, Dublin 4, Irland (nachfolgend "Google"). reCAPTCHA dient dazu zu überprüfen, 
                  ob die Dateneingabe auf unseren Internetseiten (z.B. in einem Kontaktformular) durch einen Menschen oder 
                  durch ein automatisiertes Programm erfolgt. Hierzu analysiert reCAPTCHA das Verhalten des Websitebesuchers 
                  anhand verschiedener Merkmale. Diese Analyse beginnt automatisch, sobald der Websitebesucher die Website 
                  betritt. Zur Analyse wertet reCAPTCHA verschiedene Informationen aus (z.B. IP-Adresse, Verweildauer des 
                  Websitebesuchers auf der Website oder vom Nutzer getätigte Mausbewegungen). Die bei der Analyse erfassten 
                  Daten werden an Google weitergeleitet.
                </p>
                <p className="mt-2">
                  Die reCAPTCHA-Analysen laufen vollständig im Hintergrund. Websitebesucher werden nicht darauf hingewiesen, 
                  dass eine Analyse stattfindet. Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. 
                  Der Websitebetreiber hat ein berechtigtes Interesse daran, seine Website vor missbräuchlicher automatisierter 
                  Ausspähung und vor SPAM zu schützen.
                </p>
                <p className="mt-2">
                  Weitere Informationen zu Google reCAPTCHA sowie die Datenschutzerklärung von Google finden Sie unter: 
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline ml-1">
                    https://policies.google.com/privacy
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  3.3 Google Maps
                </h3>
                <p>
                  Diese Seite nutzt über eine API den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited 
                  ("Google"), Gordon House, Barrow Street, Dublin 4, Irland.
                </p>
                <p className="mt-2">
                  Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese 
                  Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. 
                  Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung.
                </p>
                <p className="mt-2">
                  Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote 
                  und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein 
                  berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
                </p>
                <p className="mt-2">
                  Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: 
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline ml-1">
                    https://policies.google.com/privacy
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              4. E-Mail-Versand
            </h2>
            <p>
              Für den Versand von E-Mails über das Kontaktformular verwenden wir den Dienst Resend (Resend Inc., 
              548 Market St, PMB 72296, San Francisco, CA 94104-5401, USA). Ihre Kontaktdaten werden zur Bearbeitung 
              Ihrer Anfrage an Resend übermittelt und dort verarbeitet.
            </p>
            <p className="mt-2">
              Weitere Informationen zur Datenverarbeitung durch Resend finden Sie unter: 
              <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline ml-1">
                https://resend.com/legal/privacy-policy
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              5. Ihre Rechte
            </h2>
            <p>
              Sie haben jederzeit das Recht, Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten. 
              Außerdem haben Sie das Recht auf Berichtigung, Löschung oder Einschränkung der Verarbeitung sowie ein Widerspruchsrecht 
              gegen die Verarbeitung sowie das Recht auf Datenübertragbarkeit.
            </p>
            <p className="mt-2">
              <strong>Ihre Rechte im Einzelnen:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li>
                <strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie haben das Recht, Auskunft über Ihre von uns 
                verarbeiteten personenbezogenen Daten zu erhalten.
              </li>
              <li>
                <strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie haben das Recht, die Berichtigung unrichtiger 
                oder die Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen.
              </li>
              <li>
                <strong>Löschungsrecht (Art. 17 DSGVO):</strong> Sie haben das Recht, die Löschung Ihrer personenbezogenen 
                Daten zu verlangen, soweit nicht gesetzliche Aufbewahrungspflichten entgegenstehen.
              </li>
              <li>
                <strong>Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie haben das Recht, die Einschränkung 
                der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </li>
              <li>
                <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie haben das Recht, aus Gründen, die sich aus Ihrer 
                besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten, 
                die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen.
              </li>
              <li>
                <strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht, Ihre personenbezogenen Daten, 
                die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.
              </li>
              <li>
                <strong>Widerruf der Einwilligung (Art. 7 Abs. 3 DSGVO):</strong> Sie haben das Recht, Ihre erteilte 
                Einwilligung jederzeit zu widerrufen. Durch den Widerruf der Einwilligung wird die Rechtmäßigkeit der 
                aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht berührt.
              </li>
            </ul>
            <p className="mt-4">
              <strong>Beschwerderecht:</strong> Sie haben zudem das Recht, sich bei einer Aufsichtsbehörde über die 
              Verarbeitung personenbezogener Daten durch uns zu beschweren. Die zuständige Aufsichtsbehörde in Österreich ist:
            </p>
            <p className="mt-2 ml-4">
              Österreichische Datenschutzbehörde<br />
              Barichgasse 40-42<br />
              1030 Wien<br />
              Österreich<br />
              Telefon: +43 1 52 152-0<br />
              E-Mail: dsb@dsb.gv.at<br />
              Website: <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">https://www.dsb.gv.at</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              6. Kontakt für Datenschutzanfragen
            </h2>
            <p>
              Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften, Berichtigung, 
              Sperrung oder Löschung von Daten sowie Widerruf erteilter Einwilligungen wenden Sie sich bitte an:
            </p>
            <p className="mt-2 ml-4">
              Innenausbauberisha KG<br />
              Miftar Berisha<br />
              Favoritenstraße 155 22-24<br />
              1100 Wien<br />
              Österreich<br />
              E-Mail: innenausbauberisha-kg@hotmail.com<br />
              Telefon: +436641325995
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              7. Änderungen dieser Datenschutzerklärung
            </h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen 
              Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, 
              z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

