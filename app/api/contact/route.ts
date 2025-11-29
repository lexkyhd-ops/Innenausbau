import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

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
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  return forwarded?.split(',')[0] || realIP || 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request)
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, phone, service, message, recaptchaToken, honeypot } = body

    // Honeypot check - if filled, it's a bot
    if (honeypot) {
      return NextResponse.json(
        { error: 'Bot erkannt' },
        { status: 400 }
      )
    }

    // Server-side validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name ist erforderlich und muss mindestens 2 Zeichen lang sein.' },
        { status: 400 }
      )
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Gültige E-Mail-Adresse ist erforderlich.' },
        { status: 400 }
      )
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Nachricht ist erforderlich und muss mindestens 10 Zeichen lang sein.' },
        { status: 400 }
      )
    }

    if (!service || service === '') {
      return NextResponse.json(
        { error: 'Bitte wählen Sie eine Leistung aus.' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA token (only if secret key is configured)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
    if (recaptchaSecret) {
      // If secret is set, token is required
      if (!recaptchaToken) {
        return NextResponse.json(
          { error: 'reCAPTCHA-Validierung fehlgeschlagen.' },
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
            { error: 'reCAPTCHA-Validierung fehlgeschlagen. Bitte versuchen Sie es erneut.' },
            { status: 400 }
          )
        }

        // Score threshold: 0.3 is more lenient (0.0 = bot, 1.0 = human)
        // Lower threshold allows more legitimate users through
        if (recaptchaData.score !== undefined && recaptchaData.score < 0.3) {
          console.warn('reCAPTCHA score too low:', recaptchaData.score)
          return NextResponse.json(
            { error: 'reCAPTCHA-Validierung fehlgeschlagen. Bitte versuchen Sie es erneut.' },
            { status: 400 }
          )
        }
      } catch (error) {
        console.error('reCAPTCHA API error:', error)
        // Don't block submission if reCAPTCHA API is down
        // In production, you might want to be stricter
      }
    } else {
      // If no secret key is set, skip reCAPTCHA validation (development mode)
      console.warn('reCAPTCHA_SECRET_KEY not set - skipping validation')
    }

    // Map service values to readable names
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

    const serviceName = serviceNames[service] || service

    // Send email using Resend
    const resendApiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL || 'innenausbauberisha-kg@hotmail.com'

    // Debug logging
    console.log('Environment check:', {
      hasResendKey: !!resendApiKey,
      resendKeyLength: resendApiKey?.length || 0,
      contactEmail,
    })

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey)

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
                    <div class="value">${name}</div>
                  </div>
                  <div class="field">
                    <div class="label">E-Mail:</div>
                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  ${phone ? `
                  <div class="field">
                    <div class="label">Telefon:</div>
                    <div class="value"><a href="tel:${phone}">${phone}</a></div>
                  </div>
                  ` : ''}
                  <div class="field">
                    <div class="label">Gewünschte Leistung:</div>
                    <div class="value">${serviceName}</div>
                  </div>
                  <div class="field">
                    <div class="label">Nachricht:</div>
                    <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
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

        // Use verified domain email or Resend test email
        const fromEmail = process.env.FROM_EMAIL || 'info@berishakg.at'
        
        await resend.emails.send({
          from: fromEmail,
          to: contactEmail,
          replyTo: email,
          subject: `Neue Kontaktanfrage: ${serviceName}`,
          html: emailHtml,
          text: emailText,
        })

        console.log('Email sent successfully to:', contactEmail)

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
                      <p>Sehr geehrte/r ${name},</p>
                      <p>vielen Dank für Ihre Kontaktanfrage. Wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden.</p>
                      <div class="message">
                        <strong>Ihre Anfrage:</strong><br>
                        <strong>Leistung:</strong> ${serviceName}<br>
                        ${phone ? `<strong>Telefon:</strong> ${phone}<br>` : ''}
                        <strong>Nachricht:</strong><br>
                        ${message.replace(/\n/g, '<br>')}
                      </div>
                      <p>Mit freundlichen Grüßen,<br>Ihr Team von Innenausbau Berisha</p>
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
Ihr Team von Innenausbau Berisha

---
Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.
            `.trim()

            await resend.emails.send({
              from: fromEmail,
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
      } catch (emailError) {
        console.error('Failed to send email:', emailError)
        // Don't fail the request if email fails, but log it
        // In production, you might want to queue the email or retry
      }
    } else {
      console.warn('RESEND_API_KEY not set - email not sent')
      console.log('Contact form submission:', {
        name,
        email,
        phone,
        service: serviceName,
        message,
        ip,
      })
    }

    return NextResponse.json(
      { success: true, message: 'Nachricht erfolgreich gesendet!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' },
      { status: 500 }
    )
  }
}

