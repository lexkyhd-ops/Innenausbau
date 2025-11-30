export default function Impressum() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
          Impressum
        </h1>

        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Angaben gemäß § 5 ECG (E-Commerce-Gesetz)
            </h2>
            <div className="space-y-2">
              <p>
                <strong>Innenausbauberisha KG</strong>
              </p>
              <p>Kommanditgesellschaft (KG)</p>
              <p>
                Favoritenstraße 155 22-24<br />
                1100 Wien<br />
                Österreich
              </p>
              <p className="mt-4">
                <strong>Komplementär:</strong> Miftar Berisha
              </p>
              <p className="mt-4">
                <strong>UID-Nummer:</strong> ATU66264311
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Kontakt
            </h2>
            <div className="space-y-2">
              <p>
                <strong>Telefon:</strong> +436641325995
              </p>
              <p>
                <strong>E-Mail:</strong> info@berishakg.at
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Verantwortlich für den Inhalt gemäß § 25 Mediengesetz
            </h2>
            <p>
              Miftar Berisha<br />
              Innenausbauberisha KG<br />
              Favoritenstraße 155 22-24<br />
              1100 Wien<br />
              Österreich
            </p>
            <p className="mt-4">
              <strong>Mitgliedschaften:</strong><br />
              Wirtschaftskammer Österreich (WKO)
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Haftungsausschluss
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Haftung für Inhalte
                </h3>
                <p>
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. 
                  Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte 
                  können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter 
                  sind wir gemäß § 16 ECG (E-Commerce-Gesetz) für eigene Inhalte auf diesen Seiten 
                  nach den allgemeinen Gesetzen verantwortlich.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Haftung für Links
                </h3>
                <p>
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren 
                  Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden 
                  Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten 
                  Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten 
                  verantwortlich.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Urheberrecht
                </h3>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen 
                  Seiten unterliegen dem österreichischen Urheberrecht (Urheberrechtsgesetz - UrhG). 
                  Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
                  Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des 
                  jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Aufsichtsbehörde
            </h2>
            <p>
              Sollte die Innenausbauberisha KG im Firmenbuch eingetragen sein, ist die zuständige Aufsichtsbehörde 
              das Handelsgericht Wien. Bei Fragen zu gewerberechtlichen Angelegenheiten können Sie sich an die 
              Wirtschaftskammer Österreich wenden.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Datenschutz
            </h2>
            <p>
              Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener 
              Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise 
              Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit 
              möglich, stets auf freiwilliger Basis.
            </p>
            <p className="mt-4">
              Ausführliche Informationen zum Datenschutz finden Sie in unserer{' '}
              <a href="/datenschutz" className="text-primary-600 hover:underline font-semibold">
                Datenschutzerklärung
              </a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}

