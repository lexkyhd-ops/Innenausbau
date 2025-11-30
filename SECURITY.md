# Sicherheitsmaßnahmen

Diese Datei dokumentiert die implementierten Sicherheitsmaßnahmen für die Website.

## Implementierte Sicherheitsfeatures

### ✅ Kritische Sicherheitsmaßnahmen

1. **XSS-Schutz (Cross-Site Scripting)**
   - HTML-Sanitization mit DOMPurify für alle User-Inputs
   - HTML-Escape-Funktionen für E-Mail-Templates
   - Keine `dangerouslySetInnerHTML` Verwendung

2. **Admin-Authentifizierung**
   - Kein Hardcoded-Passwort-Fallback
   - Rate Limiting für Login-Versuche (5 Versuche, 15 Min Lockout)
   - Sichere Cookie-Konfiguration (HttpOnly, Secure, SameSite=strict)

### ✅ Hohe Sicherheitsmaßnahmen

3. **Security Headers**
   - Content-Security-Policy (CSP)
   - X-Frame-Options: SAMEORIGIN
   - X-Content-Type-Options: nosniff
   - Strict-Transport-Security (HSTS)
   - Referrer-Policy
   - Permissions-Policy

4. **Rate Limiting**
   - IP-basiertes Rate Limiting für Kontaktformular (3 Requests/Stunde)
   - IP-Spoofing-Schutz für Vercel
   - Login-Rate-Limiting für Admin-Bereich

5. **CSRF-Schutz**
   - CSRF-Token-Generierung und -Validierung
   - Token-basierte Anfrage-Validierung

### ✅ Mittlere Sicherheitsmaßnahmen

6. **Input-Validierung**
   - Server-seitige Validierung aller Inputs
   - Längenlimits für alle Felder
   - Type-Checking (String-Validierung)
   - Whitelist-Ansatz für Service-Werte

7. **Cookie-Security**
   - HttpOnly-Flag für Session-Cookies
   - Secure-Flag (immer HTTPS)
   - SameSite=strict für Admin-Cookies

8. **Bot-Schutz**
   - Honeypot-Feld im Kontaktformular
   - Google reCAPTCHA v3 Integration
   - Score-basierte Validierung

## Environment-Variablen

Folgende Environment-Variablen müssen gesetzt werden:

- `ADMIN_PASSWORD` - **ERFORDERLICH** (kein Fallback)
- `RESEND_API_KEY` - Für E-Mail-Versand
- `EMAIL_TO` - Empfänger-E-Mail
- `RECAPTCHA_SECRET_KEY` - Optional, aber empfohlen
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Für reCAPTCHA
- `CSRF_SECRET_SALT` - Optional, für zusätzliche CSRF-Sicherheit

## Empfohlene weitere Maßnahmen

1. **E-Mail-Security (DNS)**
   - SPF-Record: `v=spf1 include:_spf.resend.com ~all`
   - DKIM: Von Resend bereitgestellt
   - DMARC: `v=DMARC1; p=quarantine; rua=mailto:dmarc@berishakg.at`

2. **Rate Limiting (Production)**
   - Für Production: Redis-basiertes Rate Limiting (z.B. Upstash Redis)
   - Aktuell: In-Memory (funktioniert, aber nicht persistent)

3. **Monitoring**
   - Logging von fehlgeschlagenen Login-Versuchen
   - Monitoring von Rate-Limit-Überschreitungen
   - Alerting bei verdächtigen Aktivitäten

## Bekannte Einschränkungen

- Rate Limiting ist in-memory (nicht persistent zwischen Neustarts)
- CSRF-Schutz ist optional beim ersten Besuch (wird nach Token-Generierung aktiv)

## Sicherheits-Updates

Bei Sicherheitsproblemen:
1. Sofortige Meldung an: miftar@berishakg.at
2. Passwörter ändern
3. Environment-Variablen rotieren

