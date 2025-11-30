'use client'

import { useEffect, useState } from 'react'

export default function GoogleMaps() {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    // Prüfe Cookie-Consent
    const consent = localStorage.getItem('cookie-consent')
    // Google Maps benötigt Consent (Tracking-Cookie)
    if (consent === 'all') {
      setHasConsent(true)
    }
  }, [])

  if (!hasConsent) {
    return (
      <div className="rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center min-h-[300px]">
        <div className="text-center p-8">
          <p className="text-gray-600 mb-4">
            Um die Karte anzuzeigen, müssen Sie Cookies akzeptieren.
          </p>
          <button
            onClick={() => {
              localStorage.setItem('cookie-consent', 'all')
              localStorage.setItem('cookie-consent-date', new Date().toISOString())
              window.location.reload()
            }}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="Cookies akzeptieren um Karte anzuzeigen"
          >
            Cookies akzeptieren
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg overflow-hidden flex-grow min-h-[300px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.5!2d16.3745!3d48.1812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d079e5136ca9f%3A0xfdc2e58a51a1b1e9!2sFavoritenstra%C3%9Fe%20155%2C%201100%20Wien%2C%20Austria!5e0!3m2!1sen!2sat!4v1234567890123!5m2!1sen!2sat"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
        title="Standort Innenausbauberisha"
      ></iframe>
    </div>
  )
}

