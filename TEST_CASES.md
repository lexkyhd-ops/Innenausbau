# Testfälle für Innenausbauberisha KG Website

## 1. Funktionale Tests

### 1.1 Navigation

#### TC-NAV-001: Desktop Navigation
- **Beschreibung**: Alle Navigationslinks funktionieren korrekt
- **Schritte**:
  1. Öffne die Website auf Desktop (≥768px)
  2. Klicke auf jeden Link: Home, Leistungen, Galerie, Über uns, Kontakt
- **Erwartetes Ergebnis**: 
  - Alle Links führen zur korrekten Seite
  - Aktive Seite ist visuell hervorgehoben
  - Logo führt zur Startseite

#### TC-NAV-002: Mobile Navigation
- **Beschreibung**: Mobile Menü öffnet/schließt korrekt
- **Schritte**:
  1. Öffne die Website auf Mobile (<768px)
  2. Klicke auf Hamburger-Menü-Icon
  3. Klicke auf einen Link
  4. Klicke erneut auf Menü-Icon
- **Erwartetes Ergebnis**:
  - Menü öffnet sich mit Slide-in-Animation
   - Link navigiert zur korrekten Seite
   - Menü schließt sich nach Klick
  - Backdrop ist sichtbar

#### TC-NAV-003: Sticky Header
- **Beschreibung**: Header bleibt beim Scrollen sichtbar
- **Schritte**:
  1. Öffne eine beliebige Seite
  2. Scrolle nach unten
- **Erwartetes Ergebnis**: Header bleibt oben sichtbar (`sticky top-0`)

### 1.2 Kontaktformular

#### TC-CONTACT-001: Formular-Validierung (Client-Side)
- **Beschreibung**: Alle Pflichtfelder werden validiert
- **Schritte**:
  1. Öffne `/contact`
  2. Versuche Formular ohne Eingaben abzusenden
  3. Fülle nur Name aus, versuche abzusenden
  4. Fülle Name + ungültige E-Mail aus
  5. Fülle alle Felder korrekt aus
- **Erwartetes Ergebnis**:
  - Browser-Validierung verhindert Absenden bei leeren Pflichtfeldern
  - Ungültige E-Mail wird erkannt
  - Bei korrekten Daten wird Formular abgesendet

#### TC-CONTACT-002: Formular-Absendung (Erfolg)
- **Beschreibung**: Erfolgreiche Formular-Absendung
- **Schritte**:
  1. Fülle alle Felder korrekt aus:
     - Name: "Max Mustermann"
     - E-Mail: "test@example.com"
     - Telefon: "+436641325995"
     - Service: "Spachteln"
     - Nachricht: "Testnachricht"
  2. Klicke auf "Absenden"
- **Erwartetes Ergebnis**:
  - Loading-State wird angezeigt
  - Erfolgsanimation (Checkmark) wird angezeigt
  - Erfolgsmeldung erscheint
  - Formular wird zurückgesetzt
  - E-Mail wird an `kontakt@berishakg.at` gesendet

#### TC-CONTACT-003: Formular-Absendung (Fehler)
- **Beschreibung**: Fehlerbehandlung bei fehlgeschlagener Absendung
- **Schritte**:
  1. Fülle Formular aus
  2. Simuliere Netzwerkfehler (Browser DevTools → Network → Offline)
  3. Versuche abzusenden
- **Erwartetes Ergebnis**:
  - Fehlermeldung wird angezeigt
  - Formulardaten bleiben erhalten
  - Benutzer kann erneut versuchen

#### TC-CONTACT-004: Input-Längen-Validierung
- **Beschreibung**: Maximale Längen werden eingehalten
- **Schritte**:
  1. Fülle Name mit >100 Zeichen
  2. Fülle E-Mail mit >254 Zeichen
  3. Fülle Nachricht mit >2000 Zeichen
- **Erwartetes Ergebnis**:
  - Browser verhindert Eingabe über Maximum
  - Oder Client-Side-Validierung zeigt Fehler

#### TC-CONTACT-005: Honeypot-Feld
- **Beschreibung**: Bot-Schutz funktioniert
- **Schritte**:
  1. Öffne Browser DevTools
  2. Fülle das versteckte Honeypot-Feld aus
  3. Sende Formular ab
- **Erwartetes Ergebnis**: Formular wird abgelehnt (Bot-Erkennung)

#### TC-CONTACT-006: reCAPTCHA Integration
- **Beschreibung**: reCAPTCHA wird geladen und ausgeführt
- **Schritte**:
  1. Öffne `/contact`
  2. Prüfe Browser DevTools → Network
  3. Fülle Formular aus und sende ab
- **Erwartetes Ergebnis**:
  - reCAPTCHA-Script wird geladen (nur nach Cookie-Consent)
  - Token wird mit Formular gesendet
  - Server validiert Token

#### TC-CONTACT-007: CSRF-Schutz
- **Beschreibung**: CSRF-Token wird generiert und validiert
- **Schritte**:
  1. Öffne `/contact`
  2. Prüfe Browser DevTools → Application → Cookies
  3. Sende Formular ab
  4. Prüfe Request Headers
- **Erwartetes Ergebnis**:
  - CSRF-Secret wird als Cookie gesetzt
  - CSRF-Token wird im Request-Header gesendet
  - Server validiert Token

#### TC-CONTACT-008: Rate Limiting
- **Beschreibung**: Rate Limiting verhindert Spam
- **Schritte**:
  1. Sende Formular 3x erfolgreich ab
  2. Versuche 4. Mal abzusenden
- **Erwartetes Ergebnis**:
  - Erste 3 Absendungen funktionieren
  - 4. Absendung wird abgelehnt mit Rate-Limit-Fehlermeldung
  - Nach 1 Stunde wieder möglich

### 1.3 Galerie

#### TC-GALLERY-001: Bildanzeige
- **Beschreibung**: Alle Bilder werden korrekt geladen
- **Schritte**:
  1. Öffne `/gallery`
  2. Prüfe, ob alle Bilder angezeigt werden
- **Erwartetes Ergebnis**:
  - Alle Bilder aus `public/images` werden angezeigt
  - Bilder sind optimiert (`next/image`)
  - Lazy Loading funktioniert

#### TC-GALLERY-002: Kategorie-Filter
- **Beschreibung**: Filter funktionieren korrekt
- **Schritte**:
  1. Öffne `/gallery`
  2. Klicke auf "Badsanierung"
  3. Klicke auf "Alle"
  4. Klicke auf "Terrassenbau"
- **Erwartetes Ergebnis**:
  - Nur Bilder der gewählten Kategorie werden angezeigt
  - Filter-Button ist visuell hervorgehoben
  - "Alle" zeigt alle Bilder

#### TC-GALLERY-003: Lightbox-Funktionalität
- **Beschreibung**: Lightbox öffnet/schließt korrekt
- **Schritte**:
  1. Klicke auf ein Bild
  2. Prüfe Lightbox-Anzeige
  3. Klicke auf X-Button
  4. Klicke auf Hintergrund
  5. Drücke ESC-Taste
- **Erwartetes Ergebnis**:
  - Lightbox öffnet sich im Viewport (nicht in Box)
  - Bild wird zentriert angezeigt
  - X-Button schließt Lightbox
  - Klick auf Hintergrund schließt Lightbox
  - ESC-Taste schließt Lightbox

#### TC-GALLERY-004: Dynamische Kategorien
- **Beschreibung**: Neue Ordner werden automatisch erkannt
- **Schritte**:
  1. Erstelle neuen Ordner in `public/images/` (z.B. "Fliesen")
  2. Füge Bilder hinzu
  3. Lade `/gallery` neu
- **Erwartetes Ergebnis**:
  - Neue Kategorie erscheint in Filtern
  - Bilder werden angezeigt
  - Kein Build/Deploy nötig

### 1.4 Cookie Consent

#### TC-COOKIE-001: Cookie-Banner-Anzeige
- **Beschreibung**: Cookie-Banner wird beim ersten Besuch angezeigt
- **Schritte**:
  1. Lösche alle Cookies
  2. Öffne Website
- **Erwartetes Ergebnis**:
  - Cookie-Banner erscheint unten
  - Alle Optionen sind sichtbar
  - Design entspricht DSGVO/TKG 2021

#### TC-COOKIE-002: Cookie-Akzeptierung
- **Beschreibung**: Cookies werden gespeichert
- **Schritte**:
  1. Klicke auf "Alle akzeptieren"
  2. Prüfe Browser DevTools → Application → Cookies
  3. Lade Seite neu
- **Erwartetes Ergebnis**:
  - Cookie wird gesetzt (`cookie-consent=all`)
  - Banner verschwindet
  - Banner erscheint nicht erneut

#### TC-COOKIE-003: Cookie-Verweigerung
- **Beschreibung**: Nur notwendige Cookies werden gesetzt
- **Schritte**:
  1. Klicke auf "Nur notwendige"
  2. Prüfe Cookies
  3. Prüfe, ob externe Scripts geladen werden
- **Erwartetes Ergebnis**:
  - Nur notwendige Cookies gesetzt
  - reCAPTCHA wird nicht geladen
  - Google Maps wird nicht geladen

#### TC-COOKIE-004: Cookie-Einstellungen ändern
- **Beschreibung**: Benutzer kann Einstellungen ändern
- **Schritte**:
  1. Akzeptiere alle Cookies
  2. Öffne Cookie-Einstellungen (Footer-Link)
  3. Ändere Einstellungen
- **Erwartetes Ergebnis**:
  - Einstellungen können geändert werden
  - Änderungen werden gespeichert

### 1.5 Google Maps

#### TC-MAPS-001: Maps-Laden nach Consent
- **Beschreibung**: Google Maps wird nur nach Consent geladen
- **Schritte**:
  1. Lösche Cookies
  2. Öffne `/contact`
  3. Prüfe Network-Tab
  4. Akzeptiere Cookies
  5. Prüfe erneut Network-Tab
- **Erwartetes Ergebnis**:
  - Maps wird nicht geladen ohne Consent
  - Maps wird geladen nach Consent
  - Placeholder wird angezeigt ohne Consent

## 2. UI/UX Tests

### 2.1 Responsive Design

#### TC-RESP-001: Mobile Ansicht (<640px)
- **Beschreibung**: Website ist auf Mobile optimiert
- **Schritte**:
  1. Öffne Website auf Mobile oder DevTools Mobile-Modus
  2. Prüfe alle Seiten
- **Erwartetes Ergebnis**:
  - Text ist lesbar (min. 14px)
  - Buttons haben min. 44px Höhe (Tap-Targets)
  - Navigation ist mobile-optimiert
  - Bilder sind responsive
  - Kein horizontaler Scroll

#### TC-RESP-002: Tablet Ansicht (640px-1024px)
- **Beschreibung**: Tablet-Layout funktioniert
- **Schritte**:
  1. Öffne Website mit Tablet-Breite
  2. Prüfe Layout
- **Erwartetes Ergebnis**:
  - Layout passt sich an
  - Navigation ist angepasst
  - Grid-Layouts sind optimiert

#### TC-RESP-003: Desktop Ansicht (>1024px)
- **Beschreibung**: Desktop-Layout ist vollständig
- **Schritte**:
  1. Öffne Website auf Desktop
  2. Prüfe alle Seiten
- **Erwartetes Ergebnis**:
  - Volle Navigation sichtbar
  - Mehrspalten-Layouts aktiv
  - Hover-Effekte funktionieren

### 2.2 Homepage

#### TC-HOME-001: Hero-Section
- **Beschreibung**: Hero-Section ist korrekt dargestellt
- **Schritte**:
  1. Öffne Startseite
  2. Prüfe Hero-Bereich
- **Erwartetes Ergebnis**:
  - Titelbild (`TitleImage.jpg`) wird angezeigt
  - Überschrift ist lesbar
  - CTA-Buttons sind sichtbar und klickbar
  - Buttons sind auf Mobile halbrund

#### TC-HOME-002: Unsere Leistungen
- **Beschreibung**: Services-Section ist korrekt
- **Schritte**:
  1. Scrolle zu "Unsere Leistungen"
  2. Prüfe Mobile- und Desktop-Ansicht
- **Erwartetes Ergebnis**:
  - Mobile: Bild oben, Text unten (jede Service-Karte)
  - Desktop: Alternierendes Layout
  - Äußere Box hat Pulse-Animation
  - Nur äußere Ecken sind abgerundet

#### TC-HOME-003: CTA-Section Animation
- **Beschreibung**: Scroll-Animation funktioniert
- **Schritte**:
  1. Scrolle zu "Bereit für Ihr nächstes Projekt?"
  2. Scrolle langsam/ schnell
- **Erwartetes Ergebnis**:
  - Hintergrund-Gradient ändert sich basierend auf Scroll-Geschwindigkeit
  - Animation ist sanft

#### TC-HOME-004: Unsere Referenzen
- **Beschreibung**: Rotating Gallery funktioniert
- **Schritte**:
  1. Scrolle zu "Unsere Referenzen"
  2. Warte 4 Sekunden
- **Erwartetes Ergebnis**:
  - Bilder rotieren automatisch
  - Hover-Effekt funktioniert
  - Mobile: 2 Spalten, kompakt

### 2.3 Leistungen-Seite

#### TC-SERVICES-001: Service-Layout
- **Beschreibung**: Services sind korrekt dargestellt
- **Schritte**:
  1. Öffne `/services`
  2. Prüfe alle Services
- **Erwartetes Ergebnis**:
  - Mobile: Bild oben, Beschreibung unten
  - Desktop: "Malern" Bild links, Text rechts
  - Jeder Service hat äußere Box mit Pulse-Animation
  - Listen sind lesbar

#### TC-SERVICES-002: CTA-Button
- **Beschreibung**: "Jetzt Kontakt aufnehmen" Button
- **Schritte**:
  1. Scrolle zum Button
  2. Prüfe Größe und Position
- **Erwartetes Ergebnis**:
  - Button ist nicht zu breit
  - Button ist zentriert
  - Tap-Target ist ≥44px

### 2.4 Über uns-Seite

#### TC-ABOUT-001: Unsere Geschichte
- **Beschreibung**: Geschichte-Section ist visuell ansprechend
- **Schritte**:
  1. Öffne `/about`
  2. Scrolle zu "Unsere Geschichte"
- **Erwartetes Ergebnis**:
  - Gradient-Hintergrund
  - Zwei-Spalten-Layout
  - Highlight-Box mit Icon
  - Hintergrund-Box pulsiert langsam
  - Schriftgrößen sind konsistent

#### TC-ABOUT-002: Features-Boxen
- **Beschreibung**: "Erfahrung, Qualität..." Boxen
- **Schritte**:
  1. Prüfe Features-Grid
- **Erwartetes Ergebnis**:
  - Mobile: 2 Spalten
  - Desktop: 4 Spalten
  - Boxen haben Pulse-Animation
  - Größen sind auf Mobile kompakt

#### TC-ABOUT-003: Telefonnummer-Button
- **Beschreibung**: Telefonnummer ist als Button gestylt
- **Schritte**:
  1. Scrolle zu "Ihr Ansprechpartner"
  2. Prüfe Telefonnummer
- **Erwartetes Ergebnis**:
  - Telefonnummer sieht aus wie blauer Button
  - Button ist rund und kompakt
  - Klickbar (tel:-Link)

### 2.5 Kontakt-Seite

#### TC-CONTACT-UI-001: Layout
- **Beschreibung**: Kontakt-Seite Layout
- **Schritte**:
  1. Öffne `/contact`
  2. Prüfe Mobile und Desktop
- **Erwartetes Ergebnis**:
  - Mobile: Kontaktinfo oben, Formular unten
  - Desktop: Formular links, Info rechts
  - Beide Boxen haben Pulse-Animation
  - Telefon/E-Mail sind klickbar

### 2.6 Galerie-Seite

#### TC-GALLERY-UI-001: Layout
- **Beschreibung**: Galerie-Layout ist kompakt
- **Schritte**:
  1. Öffne `/gallery`
  2. Prüfe Mobile-Ansicht
- **Erwartetes Ergebnis**:
  - Filter sind außerhalb der Box
  - Bilder-Grid ist kompakt (2 Spalten auf Mobile)
  - Äußere Box hat Pulse-Animation

## 3. Sicherheitstests

#### TC-SEC-001: XSS-Schutz
- **Beschreibung**: XSS-Angriffe werden verhindert
- **Schritte**:
  1. Versuche in Kontaktformular einzugeben:
     - `<script>alert('XSS')</script>`
     - `<img src=x onerror=alert(1)>`
  2. Sende Formular ab
- **Erwartetes Ergebnis**:
  - HTML-Tags werden entfernt/escaped
  - Scripts werden nicht ausgeführt
  - E-Mail enthält keine ausführbaren Scripts

#### TC-SEC-002: Input-Sanitization
- **Beschreibung**: Alle Inputs werden gesäubert
- **Schritte**:
  1. Teste verschiedene Inputs:
     - SQL-Injection: `' OR '1'='1`
     - Command Injection: `; rm -rf /`
     - HTML-Injection: `<h1>Test</h1>`
- **Erwartetes Ergebnis**:
  - Alle gefährlichen Zeichen werden escaped
  - Keine Code-Ausführung möglich

#### TC-SEC-003: CSRF-Schutz
- **Beschreibung**: CSRF-Angriffe werden verhindert
- **Schritte**:
  1. Öffne Kontaktformular
  2. Versuche Request ohne CSRF-Token zu senden
- **Erwartetes Ergebnis**:
  - Request wird abgelehnt
  - Fehlermeldung wird angezeigt

#### TC-SEC-004: Rate Limiting
- **Beschreibung**: Rate Limiting verhindert Spam
- **Schritte**:
  1. Sende Formular 3x schnell hintereinander
  2. Versuche 4. Mal
- **Erwartetes Ergebnis**:
  - 4. Request wird abgelehnt
  - Rate-Limit-Fehlermeldung

#### TC-SEC-005: Security Headers
- **Beschreibung**: Security Headers sind gesetzt
- **Schritte**:
  1. Öffne Website
  2. Prüfe Response Headers (DevTools → Network)
- **Erwartetes Ergebnis**:
  - `Content-Security-Policy` ist gesetzt
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy` ist gesetzt
  - `Strict-Transport-Security` ist gesetzt

#### TC-SEC-006: HTTPS
- **Beschreibung**: HTTPS wird erzwungen
- **Schritte**:
  1. Versuche HTTP-URL zu öffnen
- **Erwartetes Ergebnis**:
  - Automatische Weiterleitung zu HTTPS
  - HSTS-Header ist gesetzt

## 4. Performance-Tests

#### TC-PERF-001: Ladezeit
- **Beschreibung**: Website lädt schnell
- **Schritte**:
  1. Öffne Website
  2. Prüfe Lighthouse-Score
- **Erwartetes Ergebnis**:
  - First Contentful Paint < 1.8s
  - Largest Contentful Paint < 2.5s
  - Time to Interactive < 3.8s
  - Performance Score > 90

#### TC-PERF-002: Bildoptimierung
- **Beschreibung**: Bilder sind optimiert
- **Schritte**:
  1. Prüfe Network-Tab
  2. Prüfe Bildformate
- **Erwartetes Ergebnis**:
  - `next/image` wird verwendet
  - WebP-Format wird verwendet (wo möglich)
  - Lazy Loading ist aktiv
  - `sizes`-Attribut ist korrekt

#### TC-PERF-003: Code-Splitting
- **Beschreibung**: Code wird aufgeteilt
- **Schritte**:
  1. Prüfe Network-Tab beim Laden
  2. Navigiere zu verschiedenen Seiten
- **Erwartetes Ergebnis**:
  - Nur benötigter Code wird geladen
  - Route-basiertes Code-Splitting funktioniert

## 5. Accessibility-Tests

#### TC-A11Y-001: ARIA-Labels
- **Beschreibung**: Alle interaktiven Elemente haben ARIA-Labels
- **Schritte**:
  1. Prüfe alle Buttons, Links, Formulare
  2. Verwende Screen Reader
- **Erwartetes Ergebnis**:
  - Alle Buttons haben `aria-label`
  - Navigation hat `aria-expanded`, `aria-controls`
  - Formulare haben `aria-describedby`

#### TC-A11Y-002: Keyboard-Navigation
- **Beschreibung**: Website ist per Tastatur bedienbar
- **Schritte**:
  1. Navigiere nur mit Tab-Taste
  2. Verwende Enter/Space zum Aktivieren
  3. Verwende ESC zum Schließen
- **Erwartetes Ergebnis**:
  - Alle interaktiven Elemente sind erreichbar
  - Focus-Indikatoren sind sichtbar
  - Tab-Reihenfolge ist logisch
  - ESC schließt Modals/Menüs

#### TC-A11Y-003: Kontraste
- **Beschreibung**: Text hat ausreichenden Kontrast
- **Schritte**:
  1. Prüfe alle Text-Elemente
  2. Verwende Kontrast-Checker
- **Erwartetes Ergebnis**:
  - Mindestens WCAG AA (4.5:1 für normalen Text)
  - Mindestens WCAG AA (3:1 für große Texte)

#### TC-A11Y-004: Screen Reader
- **Beschreibung**: Website ist Screen-Reader-freundlich
- **Schritte**:
  1. Verwende NVDA/JAWS/VoiceOver
  2. Navigiere durch Website
- **Erwartetes Ergebnis**:
  - Alle Inhalte sind lesbar
  - Struktur ist logisch
  - Alt-Texte sind aussagekräftig

## 6. SEO-Tests

#### TC-SEO-001: Meta-Tags
- **Beschreibung**: Alle Meta-Tags sind gesetzt
- **Schritte**:
  1. Prüfe `<head>` jeder Seite
  2. Verwende SEO-Checker
- **Erwartetes Ergebnis**:
  - `title` ist eindeutig und beschreibend
  - `description` ist vorhanden
  - `og:title`, `og:description`, `og:image` sind gesetzt
  - `twitter:card` ist gesetzt

#### TC-SEO-002: Structured Data
- **Beschreibung**: Schema.org Markup ist vorhanden
- **Schritte**:
  1. Prüfe Source-Code
  2. Verwende Google Rich Results Test
- **Erwartetes Ergebnis**:
  - LocalBusiness Schema ist vorhanden
  - Alle Pflichtfelder sind ausgefüllt
  - Validierung erfolgreich

#### TC-SEO-003: Sitemap
- **Beschreibung**: Sitemap ist vorhanden und korrekt
- **Schritte**:
  1. Öffne `/sitemap.xml`
  2. Prüfe Inhalt
- **Erwartetes Ergebnis**:
  - Alle Seiten sind enthalten
  - URLs sind korrekt
  - `lastmod` ist gesetzt

#### TC-SEO-004: robots.txt
- **Beschreibung**: robots.txt ist korrekt
- **Schritte**:
  1. Öffne `/robots.txt`
  2. Prüfe Inhalt
- **Erwartetes Ergebnis**:
  - `/admin` ist disallowed
  - `/maintenance` ist disallowed
  - `/api/` ist disallowed
  - Sitemap-Location ist angegeben

## 7. Browser-Kompatibilität

#### TC-BROWSER-001: Chrome
- **Beschreibung**: Website funktioniert in Chrome
- **Schritte**:
  1. Teste in Chrome (neueste Version)
- **Erwartetes Ergebnis**: Alle Features funktionieren

#### TC-BROWSER-002: Firefox
- **Beschreibung**: Website funktioniert in Firefox
- **Schritte**:
  1. Teste in Firefox (neueste Version)
- **Erwartetes Ergebnis**: Alle Features funktionieren

#### TC-BROWSER-003: Safari
- **Beschreibung**: Website funktioniert in Safari
- **Schritte**:
  1. Teste in Safari (neueste Version)
- **Erwartetes Ergebnis**: Alle Features funktionieren

#### TC-BROWSER-004: Edge
- **Beschreibung**: Website funktioniert in Edge
- **Schritte**:
  1. Teste in Edge (neueste Version)
- **Erwartetes Ergebnis**: Alle Features funktionieren

## 8. Edge Cases

#### TC-EDGE-001: Sehr lange Texte
- **Beschreibung**: Lange Eingaben werden korrekt behandelt
- **Schritte**:
  1. Gebe sehr lange Texte ein (aber innerhalb der Limits)
- **Erwartetes Ergebnis**: 
  - Text wird korrekt angezeigt
  - Layout bricht nicht zusammen

#### TC-EDGE-002: Sehr viele Bilder
- **Beschreibung**: Galerie mit vielen Bildern
- **Schritte**:
  1. Füge 100+ Bilder zu einer Kategorie hinzu
  2. Öffne Galerie
- **Erwartetes Ergebnis**:
  - Alle Bilder werden geladen
  - Performance bleibt akzeptabel
  - Lazy Loading funktioniert

#### TC-EDGE-003: Leere Kategorien
- **Beschreibung**: Leere Kategorien werden behandelt
- **Schritte**:
  1. Erstelle leeren Ordner in `public/images`
  2. Öffne Galerie
- **Erwartetes Ergebnis**:
  - Leere Kategorie erscheint nicht in Filtern
  - Keine Fehler

#### TC-EDGE-004: Sonderzeichen in Dateinamen
- **Beschreibung**: Bilder mit Sonderzeichen werden geladen
- **Schritte**:
  1. Benenne Bild um mit Sonderzeichen (z.B. `test-äöü.jpg`)
  2. Prüfe Galerie
- **Erwartetes Ergebnis**: Bild wird korrekt geladen

## 9. Wartungsmodus

#### TC-MAINT-001: Wartungsmodus aktivieren
- **Beschreibung**: Wartungsmodus funktioniert
- **Schritte**:
  1. Setze `MAINTENANCE_MODE=true` in Vercel
  2. Öffne Website
- **Erwartetes Ergebnis**:
  - Wartungsseite wird angezeigt
  - Alle anderen Seiten sind nicht erreichbar
  - `/api` Routes funktionieren weiterhin

#### TC-MAINT-002: Wartungsmodus deaktivieren
- **Beschreibung**: Website ist wieder erreichbar
- **Schritte**:
  1. Setze `MAINTENANCE_MODE=false` in Vercel
  2. Öffne Website
- **Erwartetes Ergebnis**: Website ist wieder normal erreichbar

---

## Test-Reporting

### Test-Status-Tracking
- ✅ Bestanden
- ❌ Fehlgeschlagen
- ⚠️ Teilweise bestanden
- ⏸️ Nicht getestet

### Prioritäten
- **P0 (Kritisch)**: Muss vor Release funktionieren
- **P1 (Hoch)**: Sollte vor Release funktionieren
- **P2 (Mittel)**: Kann nach Release gefixt werden
- **P3 (Niedrig)**: Nice-to-have

### Empfohlene Test-Reihenfolge
1. Funktionale Tests (P0)
2. Sicherheitstests (P0)
3. UI/UX Tests (P1)
4. Performance-Tests (P1)
5. Accessibility-Tests (P1)
6. SEO-Tests (P2)
7. Browser-Kompatibilität (P2)
8. Edge Cases (P3)

