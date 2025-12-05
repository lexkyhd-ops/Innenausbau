import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { sanitizeHtml, sanitizeEmail, sanitizePhone, sanitizeService, escapeHtml, validateLength, MAX_LENGTHS } from '@/lib/security'
import { verifyCsrfToken } from '@/lib/csrf'

// Simple in-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT = {
  maxRequests: 3, // Max 3 requests
  windowMs: 60 * 60 * 1000, // Per hour (1 hour)
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs })
    return true
  }

  if (record.count >= RATE_LIMIT.maxRequests) {
    return false
  }

  record.count++
  return true
}

function getClientIP(request: NextRequest): string {
  // On Vercel, use trusted headers
  if (process.env.VERCEL) {
    // Vercel provides trusted headers
    return request.headers.get('x-vercel-forwarded-for') || 
           request.headers.get('x-real-ip') || 
           'unknown'
  }
  
  // For other platforms, trust x-forwarded-for only if behind proxy
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    // Take last IP (original client) if behind multiple proxies
    const ips = forwarded.split(',').map(ip => ip.trim()).filter(ip => ip)
    return ips[ips.length - 1] || 'unknown'
  }
  
  return request.headers.get('x-real-ip') || 'unknown'
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin')
  // Only allow same-origin or specific trusted origins
  const allowedOrigin = origin && origin.includes('berishakg.at') ? origin : 'https://www.berishakg.at'
  
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request)
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
        { status: 429 }
      )
    }

    // CSRF protection (skip if no secret exists - first visit)
    const csrfToken = request.headers.get('x-csrf-token')
    const csrfSecret = request.cookies.get('csrf-secret')?.value

    // Only enforce CSRF if secret exists (user has visited page and got token)
    if (csrfSecret) {
      if (!csrfToken || !verifyCsrfToken(csrfSecret, csrfToken)) {
        console.error('CSRF validation failed', { hasToken: !!csrfToken, hasSecret: !!csrfSecret })
        return NextResponse.json(
          { success: false, error: 'Ungültige Anfrage. Bitte laden Sie die Seite neu.' },
          { status: 403 }
        )
      }
    }

    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json(
        { success: false, error: 'Ungültige Anfrage-Daten.' },
        { status: 400 }
      )
    }
    let { name, email, phone, service, message, recaptchaToken, honeypot } = body

    // Honeypot check - if filled, it's a bot
    if (honeypot) {
      return NextResponse.json(
        { success: false, error: 'Bot erkannt' },
        { status: 400 }
      )
    }

    // Server-side validation and sanitization
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name ist erforderlich und muss mindestens 2 Zeichen lang sein.' },
        { status: 400 }
      )
    }

    if (!validateLength('name', name)) {
      return NextResponse.json(
        { success: false, error: `Name darf maximal ${MAX_LENGTHS.name} Zeichen lang sein.` },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Gültige E-Mail-Adresse ist erforderlich.' },
        { status: 400 }
      )
    }

    if (!validateLength('email', email)) {
      return NextResponse.json(
        { success: false, error: `E-Mail-Adresse darf maximal ${MAX_LENGTHS.email} Zeichen lang sein.` },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Nachricht ist erforderlich und muss mindestens 10 Zeichen lang sein.' },
        { status: 400 }
      )
    }

    if (!validateLength('message', message)) {
      return NextResponse.json(
        { success: false, error: `Nachricht darf maximal ${MAX_LENGTHS.message} Zeichen lang sein.` },
        { status: 400 }
      )
    }

    if (!service || typeof service !== 'string' || service === '') {
      return NextResponse.json(
        { success: false, error: 'Bitte wählen Sie eine Leistung aus.' },
        { status: 400 }
      )
    }

    // Sanitize all inputs
    name = sanitizeHtml(name.trim())
    email = sanitizeEmail(email.trim())
    phone = phone ? sanitizePhone(phone.trim()) : ''
    service = sanitizeService(service.trim())
    message = sanitizeHtml(message.trim())

    // Verify reCAPTCHA token (only if both keys are configured)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

    // Only validate reCAPTCHA if both keys are configured
    const useRecaptcha = recaptchaSecret && recaptchaSiteKey

    console.log('reCAPTCHA config check:', {
      hasSecret: !!recaptchaSecret,
      hasSiteKey: !!recaptchaSiteKey,
      useRecaptcha,
      hasToken: !!recaptchaToken
    })

    if (useRecaptcha) {
      // If reCAPTCHA is enabled, token is required
      if (!recaptchaToken) {
        return NextResponse.json(
          { success: false, error: 'reCAPTCHA-Validierung fehlgeschlagen.' },
          { status: 400 }
        )
      }

      // Verify reCAPTCHA with Google
      try {
        const recaptchaResponse = await fetch(
          `https://www.google.com/recaptcha/api/siteverify`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
          }
        )

        const recaptchaData = await recaptchaResponse.json()

        if (!recaptchaData.success) {
          console.error('reCAPTCHA verification failed:', recaptchaData)
          return NextResponse.json(
            { success: false, error: 'reCAPTCHA-Validierung fehlgeschlagen. Bitte versuchen Sie es erneut.' },
            { status: 400 }
          )
        }

        // Score threshold: 0.3 is more lenient (0.0 = bot, 1.0 = human)
        // Lower threshold allows more legitimate users through
        if (recaptchaData.score !== undefined && recaptchaData.score < 0.3) {
          console.warn('reCAPTCHA score too low:', recaptchaData.score)
          return NextResponse.json(
            { success: false, error: 'reCAPTCHA-Validierung fehlgeschlagen. Bitte versuchen Sie es erneut.' },
            { status: 400 }
          )
        }
      } catch (error) {
        console.error('reCAPTCHA API error:', error)
        // Don't block submission if reCAPTCHA API is down
        // In production, you might want to be stricter
      }
    } else {
      // If reCAPTCHA keys are not configured, skip validation
      console.log('reCAPTCHA not configured - skipping validation')
    }

    // Map service values to readable names (whitelist approach)
    const serviceNames: Record<string, string> = {
      'trockenbau-rigips-waende': 'Errichten von Rigips-Wänden',
      'trockenbau-rigips-decken': 'Rigips-Decken',
      'trockenbau-rigips-trennwaende': 'Rigips-Trennwände',
      'trockenbau-spachteln': 'Spachteln von Wänden und Decken',
      'trockenbau-risse': 'Ausbessern von Rissen und Löchern',
      'trockenbau-glaetten': 'Glätten von unebenen Untergründen',
      'trockenbau-vorbereitung': 'Vorbereitung für den Anstrich',
      'trockenbau-feinspachteln': 'Feinspachteln für hochwertige Oberflächen',
      'malern-innen': 'Innenanstrich von Wohn- und Geschäftsräumen',
      'malern-aussen': 'Außenanstrich von Fassaden',
      'malern-holz': 'Holzanstrich',
      'malern-fassade': 'Fassadenanstrich',
      'malern-tapeten': 'Tapeten',
      'malern-vorbereitung': 'Vorbereitung und Grundierung',
      'malern-farbberatung': 'Farbberatung und Planung',
      'malern-schutzanstrich': 'Schutzanstrich für Holz und Metall',
      'terrassenbau-holzterrassen': 'Holzterrassen (Lärche, Douglasie, Bangkirai)',
      'terrassenbau-planung': 'Planung und Beratung',
      'terrassenbau-fundament': 'Fundament und Unterbau',
      'terrassenbau-montage': 'Montage und Verlegung',
      'terrassenbau-balkon': 'Balkonverkleidungen',
      'terrassenbau-pool': 'Poolumrandungen',
      'sonstiges': 'Sonstiges',
    }

    // Whitelist validation - reject unknown services
    if (!serviceNames[service]) {
      return NextResponse.json(
        { success: false, error: 'Ungültige Leistung ausgewählt.' },
        { status: 400 }
      )
    }

    const serviceName = serviceNames[service]

    // Send email using SMTP
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = parseInt(process.env.SMTP_PORT || '587')
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const emailFrom = process.env.EMAIL_FROM || 'info@berishakg.at'
    const emailTo = process.env.EMAIL_TO

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error('SMTP configuration is incomplete')
      return NextResponse.json(
        { success: false, error: 'E-Mail-Service nicht konfiguriert.' },
        { status: 500 }
      )
    }

    if (!emailTo) {
      console.error('EMAIL_TO is not set')
      return NextResponse.json(
        { success: false, error: 'Empfänger-E-Mail nicht konfiguriert.' },
        { status: 500 }
      )
    }

      try {
        // Create SMTP transporter
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465, // true for 465, false for other ports
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          tls: {
            rejectUnauthorized: false, // Allow self-signed certificates if needed
          },
        })

        const emailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #0ea5e9; color: white; padding: 20px; text-align: center; }
                .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #374151; }
                .value { color: #6b7280; margin-top: 5px; }
                .message-box { background-color: white; padding: 15px; border-left: 4px solid #0ea5e9; margin-top: 10px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Neue Kontaktanfrage</h1>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">Name:</div>
                  <div class="value">${escapeHtml(name)}</div>
                  </div>
                  <div class="field">
                    <div class="label">E-Mail:</div>
                  <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
                  </div>
                  ${phone ? `
                  <div class="field">
                    <div class="label">Telefon:</div>
                  <div class="value"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></div>
                  </div>
                  ` : ''}
                  <div class="field">
                    <div class="label">Gewünschte Leistung:</div>
                  <div class="value">${escapeHtml(serviceName)}</div>
                  </div>
                  <div class="field">
                    <div class="label">Nachricht:</div>
                  <div class="message-box">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `

        const emailText = `
Neue Kontaktanfrage

Name: ${name}
E-Mail: ${email}
${phone ? `Telefon: ${phone}` : ''}
Gewünschte Leistung: ${serviceName}

Nachricht:
${message}
        `.trim()

        await transporter.sendMail({
          from: `Berisha KG <${emailFrom}>`,
          to: emailTo,
          replyTo: email,
          subject: `Neue Anfrage von ${name}`,
          html: emailHtml,
          text: emailText,
        })

      console.log('Email sent successfully to:', emailTo)

      // Send confirmation email to the customer
          try {
            const confirmationHtml = `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #0ea5e9; color: white; padding: 20px; text-align: center; }
                    .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
                    .message { background-color: white; padding: 15px; border-left: 4px solid #0ea5e9; margin-top: 10px; }
                    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; text-align: center; }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <h1>Vielen Dank für Ihre Anfrage!</h1>
                    </div>
                    <div class="content">
                  <p>Sehr geehrte/r ${escapeHtml(name)},</p>
                      <p>vielen Dank für Ihre Kontaktanfrage. Wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden.</p>
                      <div class="message">
                        <strong>Ihre Anfrage:</strong><br>
                    <strong>Leistung:</strong> ${escapeHtml(serviceName)}<br>
                    ${phone ? `<strong>Telefon:</strong> ${escapeHtml(phone)}<br>` : ''}
                        <strong>Nachricht:</strong><br>
                    ${escapeHtml(message).replace(/\n/g, '<br>')}
                      </div>
                  <p>Mit freundlichen Grüßen,<br>Miftar Berisha<br>Innenausbau Berisha</p>
                    </div>
                    <div class="footer">
                      <p>Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.</p>
                      <p>Bei Fragen erreichen Sie uns über unser Kontaktformular oder telefonisch.</p>
                    </div>
                  </div>
                </body>
              </html>
            `

            const confirmationText = `
Vielen Dank für Ihre Anfrage!

Sehr geehrte/r ${name},

vielen Dank für Ihre Kontaktanfrage. Wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden.

Ihre Anfrage:
Leistung: ${serviceName}
${phone ? `Telefon: ${phone}` : ''}
Nachricht:
${message}

Mit freundlichen Grüßen,
Miftar Berisha
Innenausbau Berisha

---
Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.
            `.trim()

            await transporter.sendMail({
              from: `Berisha KG <${emailFrom}>`,
              to: email,
              subject: `Bestätigung Ihrer Anfrage: ${serviceName}`,
              html: confirmationHtml,
              text: confirmationText,
            })

            console.log('Confirmation email sent successfully to:', email)
          } catch (confirmationError) {
            console.error('Failed to send confirmation email:', confirmationError)
            // Don't fail the request if confirmation email fails
          }

      return NextResponse.json(
        { success: true },
        { status: 200 }
      )
      } catch (emailError) {
        console.error('Failed to send email:', emailError)
        return NextResponse.json(
          { success: false, error: 'Fehler beim Senden der E-Mail. Bitte versuchen Sie es später erneut.' },
          { status: 500 }
        )
      }
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' },
      { status: 500 }
    )
  }
}

