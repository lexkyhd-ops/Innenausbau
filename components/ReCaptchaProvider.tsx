'use client'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { ReactNode, useEffect, useState } from 'react'

export default function ReCaptchaProvider({ children }: { children: ReactNode }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    // Prüfe Cookie-Consent
    const consent = localStorage.getItem('cookie-consent')
    // reCAPTCHA ist notwendig für Spam-Schutz, daher laden wenn Consent gegeben oder notwendige Cookies akzeptiert
    if (consent === 'all' || consent === 'necessary') {
      setHasConsent(true)
    }
  }, [])

  if (!siteKey || !hasConsent) {
    return <>{children}</>
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      language="de"
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}



