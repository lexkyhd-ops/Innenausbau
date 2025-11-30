'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Prüfe ob Consent bereits gegeben wurde
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setShowBanner(false)
    // Reload page to activate scripts
    window.location.reload()
  }

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setShowBanner(false)
  }

  const rejectAll = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Cookie-Einstellungen
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Wir verwenden Cookies und ähnliche Technologien, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
                Einige Cookies sind notwendig für den Betrieb der Website, während andere uns helfen, diese Website und die Nutzererfahrung zu verbessern 
                (Tracking-Cookies). Sie können selbst entscheiden, ob Sie die Cookies zulassen möchten. 
                Bitte beachten Sie, dass bei einer Ablehnung unter Umständen nicht mehr alle Funktionalitäten der Website zur Verfügung stehen.
                Die Verwendung erfolgt gemäß den Bestimmungen der DSGVO und des österreichischen Telekommunikationsgesetzes (TKG 2021).
              </p>
              
              {showDetails && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Notwendige Cookies</h4>
                    <p>Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.</p>
                    <ul className="list-disc list-inside ml-2 mt-1">
                      <li>Session-Cookies für die Website-Funktionalität</li>
                      <li>reCAPTCHA (Google) - zum Schutz vor Spam</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Externe Inhalte</h4>
                    <p>Wir verwenden externe Dienste, die Cookies setzen können:</p>
                    <ul className="list-disc list-inside ml-2 mt-1">
                      <li>Google Maps - für die Kartenanzeige</li>
                      <li>Google reCAPTCHA - für Spam-Schutz</li>
                    </ul>
                  </div>
                  <p className="text-xs mt-2">
                    Weitere Informationen finden Sie in unserer{' '}
                    <Link href="/datenschutz" className="text-primary-600 hover:underline">
                      Datenschutzerklärung
                    </Link>.
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-sm text-primary-600 hover:underline"
                >
                  {showDetails ? 'Weniger anzeigen' : 'Mehr Informationen'}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 md:ml-4">
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                Ablehnen
              </button>
              <button
                onClick={acceptNecessary}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                Nur notwendige
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors whitespace-nowrap"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

