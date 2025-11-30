'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

export default function LottieScript() {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    // Prüfe Cookie-Consent
    const consent = localStorage.getItem('cookie-consent')
    // dotlottie ist für Animationen, kann als notwendig betrachtet werden
    if (consent === 'all' || consent === 'necessary') {
      setHasConsent(true)
    }
  }, [])

  if (!hasConsent) {
    return null
  }

  return (
    <Script 
      src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.5/dist/dotlottie-wc.js" 
      type="module" 
      strategy="lazyOnload"
    />
  )
}

