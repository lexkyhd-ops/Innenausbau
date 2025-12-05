'use client'

import { useState, useEffect } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { MAX_LENGTHS } from '@/lib/security'

export default function ContactForm() {
  // Get reCAPTCHA hook - will be undefined if provider is not available
  const recaptchaHook = useGoogleReCaptcha()
  const executeRecaptcha = recaptchaHook?.executeRecaptcha
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    honeypot: '', // Honeypot field for bot detection
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [csrfToken, setCsrfToken] = useState('')

  // Generate CSRF token on mount
  useEffect(() => {
    // Get or create CSRF secret
    let csrfSecret = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrf-secret='))
      ?.split('=')[1]

    if (!csrfSecret && typeof window !== 'undefined' && window.crypto) {
      // Generate new secret using Web Crypto API
      const array = new Uint8Array(32)
      window.crypto.getRandomValues(array)
      csrfSecret = Array.from(array)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
      
      // Set cookie
      document.cookie = `csrf-secret=${csrfSecret}; path=/; max-age=86400; SameSite=Strict`
    }

    if (csrfSecret) {
      // Generate token from secret
      fetch('/api/csrf-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: csrfSecret }),
      })
        .then(res => res.json())
        .then(data => setCsrfToken(data.token))
        .catch(() => {}) // Fail silently, CSRF will be checked server-side
    }
  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')
    setErrorMessage('')
    
    // Validate that a service is selected
    if (!formData.service || formData.service === '') {
      setSubmitStatus('error')
      setErrorMessage('Bitte wählen Sie eine Leistung aus.')
      return
    }
    
    // Get reCAPTCHA token (only if available and properly configured)
    let recaptchaToken = ''
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    // Only use reCAPTCHA if both keys are configured AND provider is available
    const useRecaptcha = siteKey && secretKey && executeRecaptcha

    if (useRecaptcha) {
      try {
        recaptchaToken = await executeRecaptcha('contact_form')
        console.log('reCAPTCHA token generated successfully')
      } catch (error) {
        console.error('reCAPTCHA error:', error)
        setSubmitStatus('error')
        setErrorMessage('reCAPTCHA-Validierung fehlgeschlagen. Bitte versuchen Sie es erneut.')
        return
      }
    } else {
      console.log('reCAPTCHA not configured or not available - skipping')
    }

    console.log('Sending form data:', {
      hasToken: !!recaptchaToken,
      tokenLength: recaptchaToken?.length,
      useRecaptcha
    })

    setIsSubmitting(true)

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      
      // Only add CSRF token if available
      if (csrfToken) {
        headers['X-CSRF-Token'] = csrfToken
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          recaptchaToken,
          honeypot: formData.honeypot,
        }),
      })

      // Check if response has content
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('Non-JSON response:', text)
        setSubmitStatus('error')
        setErrorMessage(`Server-Fehler (${response.status}): Bitte versuchen Sie es später erneut.`)
        setIsSubmitting(false)
        return
      }

      let data
      try {
        const text = await response.text()
        if (!text) {
          throw new Error('Empty response')
        }
        data = JSON.parse(text)
      } catch (parseError) {
        console.error('JSON parse error:', parseError)
        setSubmitStatus('error')
        setErrorMessage('Ungültige Server-Antwort. Bitte versuchen Sie es erneut.')
        setIsSubmitting(false)
        return
      }

      if (!response.ok) {
        setSubmitStatus('error')
        setErrorMessage(data?.error || `Fehler ${response.status}: Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.`)
        setIsSubmitting(false)
        return
      }

      if (!data || !data.success) {
        setSubmitStatus('error')
        setErrorMessage(data?.error || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
        setIsSubmitting(false)
        return
      }

      setSubmitStatus('success')
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        honeypot: '',
      })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage(
        error instanceof Error 
          ? `Fehler: ${error.message}` 
          : 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show success message instead of form after successful submission
  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border-2 border-green-400 rounded-lg p-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="success-checkmark">
            <svg 
              className="checkmark" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 52 52"
            style={{ width: '128px', height: '128px' }} 
            >
              <circle 
                className="checkmark-circle" 
                cx="26" 
                cy="26" 
                r="25" 
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />
              <path 
                className="checkmark-check" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-3 success-fade-in">
          Vielen Dank!
        </h3>
        <p className="text-lg text-green-700 mb-2 success-fade-in-delay">
          Ihre Nachricht wurde erfolgreich gesendet.
        </p>
        <p className="text-sm text-green-600 success-fade-in-delay-2">
          Wir werden uns schnellstmöglich bei Ihnen melden.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          maxLength={MAX_LENGTHS.name}
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          E-Mail *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          maxLength={MAX_LENGTHS.email}
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Telefon
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          maxLength={MAX_LENGTHS.phone}
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
          Gewünschte Leistung
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        >
          <option value="" disabled>Bitte wählen</option>
          <optgroup label="Trockenbau">
            <option value="trockenbau-rigips-waende">Errichten von Rigips-Wänden</option>
            <option value="trockenbau-rigips-decken">Rigips-Decken</option>
            <option value="trockenbau-rigips-trennwaende">Rigips-Trennwände</option>
            <option value="trockenbau-spachteln">Spachteln von Wänden und Decken</option>
            <option value="trockenbau-risse">Ausbessern von Rissen und Löchern</option>
            <option value="trockenbau-glaetten">Glätten von unebenen Untergründen</option>
            <option value="trockenbau-vorbereitung">Vorbereitung für den Anstrich</option>
            <option value="trockenbau-feinspachteln">Feinspachteln für hochwertige Oberflächen</option>
          </optgroup>
          <optgroup label="Malern">
            <option value="malern-innen">Innenanstrich von Wohn- und Geschäftsräumen</option>
            <option value="malern-aussen">Außenanstrich von Fassaden</option>
            <option value="malern-holz">Holzanstrich</option>
            <option value="malern-fassade">Fassadenanstrich</option>
            <option value="malern-tapeten">Tapeten</option>
            <option value="malern-vorbereitung">Vorbereitung und Grundierung</option>
            <option value="malern-farbberatung">Farbberatung und Planung</option>
            <option value="malern-schutzanstrich">Schutzanstrich für Holz und Metall</option>
          </optgroup>
          <optgroup label="Terrassenbau">
            <option value="terrassenbau-holzterrassen">Holzterrassen (Lärche, Douglasie, Bangkirai)</option>
            <option value="terrassenbau-planung">Planung und Beratung</option>
            <option value="terrassenbau-fundament">Fundament und Unterbau</option>
            <option value="terrassenbau-montage">Montage und Verlegung</option>
            <option value="terrassenbau-balkon">Balkonverkleidungen</option>
            <option value="terrassenbau-pool">Poolumrandungen</option>
          </optgroup>
          <option value="sonstiges">Sonstiges</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Nachricht *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={MAX_LENGTHS.message}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        />
      </div>

      {/* Honeypot field - hidden from users, bots will fill it */}
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
        <label htmlFor="honeypot">Leave this field empty</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {submitStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {errorMessage || 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.'}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-label={isSubmitting ? 'Formular wird gesendet' : 'Nachricht senden'}
        className="w-full bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
      </button>
    </form>
  )
}

