'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

export default function LottieScript() {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    // Prüfe Cookie-Consent
    const consent = localStorage.getItem('cookie-consent')
    // dotlottie ist für Animationen, kann als notwendig betrachtet werden
    // Lade es immer, da es für die Erfolgsanimation im Kontaktformular benötigt wird
    if (consent === 'all' || consent === 'necessary' || !consent) {
      setHasConsent(true)
    }
    
    // Listen for consent changes
    const handleStorageChange = () => {
      const newConsent = localStorage.getItem('cookie-consent')
      if (newConsent === 'all' || newConsent === 'necessary' || !newConsent) {
        setHasConsent(true)
      } else {
        setHasConsent(false)
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  if (!hasConsent) {
    return null
  }

  return (
    <Script 
      src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.5/dist/dotlottie-wc.js" 
      type="module" 
      strategy="afterInteractive"
      onLoad={() => {
        // Script loaded successfully
        if (typeof window !== 'undefined') {
          console.log('dotlottie-wc script loaded')
        }
      }}
      onError={(e) => {
        console.error('Failed to load dotlottie-wc script:', e)
      }}
    />
  )
}


