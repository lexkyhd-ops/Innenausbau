'use client'

import { useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

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
    
    // Get reCAPTCHA token (only if available)
    let recaptchaToken = ''
    if (executeRecaptcha) {
      try {
        recaptchaToken = await executeRecaptcha('contact_form')
      } catch (error) {
        console.error('reCAPTCHA error:', error)
        // Only fail if reCAPTCHA is required (keys are set)
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
        if (siteKey) {
          setSubmitStatus('error')
          setErrorMessage('reCAPTCHA-Validierung fehlgeschlagen. Bitte versuchen Sie es erneut.')
          return
        }
        // If no site key, continue without reCAPTCHA (development mode)
      }
    }
    
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

      const data = await response.json()

      if (!response.ok) {
        setSubmitStatus('error')
        setErrorMessage(data.error || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
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
      setErrorMessage('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show success message instead of form after successful submission
  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border-2 border-green-400 rounded-lg p-8 text-center">
        <div className="mb-4 flex justify-center">
          <dotlottie-wc 
            src="https://lottie.host/f68e4dbf-a7a1-4fc2-b23e-cdcb24cfc4de/o3cSAAtZRy.lottie" 
            style={{ width: '128px', height: '128px' }} 
            autoplay 
          />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-3">
          Vielen Dank!
        </h3>
        <p className="text-lg text-green-700 mb-2">
          Ihre Nachricht wurde erfolgreich gesendet.
        </p>
        <p className="text-sm text-green-600">
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
        className="w-full bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
      </button>
    </form>
  )
}

