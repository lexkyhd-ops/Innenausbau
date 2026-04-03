# SMTP-Konfiguration für das Kontaktformular

Das Kontaktformular wurde von Resend auf SMTP umgestellt. Um E-Mails zu versenden, müssen folgende Umgebungsvariablen konfiguriert werden:

## Erforderliche SMTP-Umgebungsvariablen

### Für lokale Entwicklung:
Erstelle eine `.env.local`-Datei im Projektroot mit folgenden Variablen:

```env
# SMTP Configuration – alles über kontakt@berishakg.at
SMTP_HOST=w020f8d7.kasserver.com
SMTP_PORT=587
SMTP_USER=kontakt@berishakg.at
SMTP_PASS=dein-postfach-passwort
EMAIL_FROM=kontakt@berishakg.at
EMAIL_TO=kontakt@berishakg.at
```

### Für Live-Deployment:
**WICHTIG:** Diese Variablen müssen in deiner Hosting-Plattform gesetzt werden!

#### Bei Vercel:
1. Gehe zu Vercel Dashboard → Dein Projekt → Settings → Environment Variables
2. Füge diese Variablen hinzu (alles über ein Postfach „kontakt“):
   - `SMTP_HOST`: `w020f8d7.kasserver.com`
   - `SMTP_PORT`: `587`
   - `SMTP_USER`: `kontakt@berishakg.at`
   - `SMTP_PASS`: Passwort des Postfachs kontakt@berishakg.at
   - `EMAIL_FROM`: `kontakt@berishakg.at`
   - `EMAIL_TO`: `kontakt@berishakg.at`
3. Entferne `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` falls vorhanden
4. Redeploy die App

#### Bei Netlify:
1. Gehe zu Netlify Dashboard → Dein Projekt → Site settings → Environment variables
2. Füge die gleichen Variablen hinzu
3. Redeploy die App

## SMTP-Anbieter Beispiele

### Gmail
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=deine-email@gmail.com
SMTP_PASS=dein-gmail-app-passwort
```

**Wichtig:** Bei Gmail musst du ein "App-Passwort" verwenden, nicht dein normales Passwort. Gehe zu deinen Google-Kontoeinstellungen > Sicherheit > App-Passwörter.

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=deine-email@outlook.com
SMTP_PASS=dein-passwort
```

### Andere Anbieter
Passe die SMTP-Einstellungen entsprechend deinem E-Mail-Anbieter an.

## Optionale Konfiguration

### reCAPTCHA (empfohlen für Produktion)
```env
RECAPTCHA_SECRET_KEY=dein-recaptcha-secret-key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=dein-recaptcha-site-key
```

## Testen

Nach der Konfiguration kannst du das Kontaktformular auf deiner Website testen. Bei erfolgreichem Versand solltest du:
1. Eine Bestätigungs-E-Mail an den Absender erhalten
2. Eine Benachrichtigungs-E-Mail an die konfigurierte E-Mail-Adresse (EMAIL_TO) erhalten
