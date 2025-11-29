# Handwerksfirma Website

Moderne, responsive Website für eine Handwerksfirma mit Next.js 14, TypeScript und Tailwind CSS.

## Features

- **Homepage** mit Hero-Section und Service-Übersicht
- **Services-Seite** mit detaillierten Beschreibungen (Spachteln, Malern, Terrassenbau)
- **Galerie** mit Filter-Funktionalität und Lightbox
- **Über uns** Seite mit Firmengeschichte und Team
- **Kontakt** Seite mit Kontaktformular
- Vollständig responsive Design
- SEO-optimiert

## Technologie-Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Icons

## Installation

1. Installieren Sie die Abhängigkeiten:

```bash
npm install
```

2. Starten Sie den Development-Server:

```bash
npm run dev
```

3. Öffnen Sie [http://localhost:3000](http://localhost:3000) im Browser.

## Verfügbare Scripts

- `npm run dev` - Startet den Development-Server
- `npm run build` - Erstellt eine Production-Build
- `npm start` - Startet den Production-Server
- `npm run lint` - Führt ESLint aus

## Projektstruktur

```
├── app/                    # Next.js App Router Seiten
│   ├── layout.tsx         # Root Layout
│   ├── page.tsx           # Homepage
│   ├── services/          # Services-Seite
│   ├── gallery/           # Galerie-Seite
│   ├── about/             # Über uns Seite
│   └── contact/           # Kontakt-Seite
├── components/            # React Komponenten
│   ├── Header.tsx        # Header mit Navigation
│   ├── Footer.tsx        # Footer
│   ├── Hero.tsx          # Hero-Section
│   ├── ServiceCard.tsx   # Service-Karte
│   ├── ImageGallery.tsx  # Bildergalerie
│   └── ContactForm.tsx   # Kontaktformular
└── public/               # Statische Dateien
```

## Anpassungen

### Firmeninformationen

Passen Sie die folgenden Dateien an, um Ihre Firmeninformationen einzutragen:

- `components/Footer.tsx` - Kontaktinformationen im Footer
- `app/contact/page.tsx` - Kontaktinformationen auf der Kontakt-Seite
- `app/layout.tsx` - Meta-Tags für SEO

### Bilder

Ersetzen Sie die Platzhalter-Bilder in:
- `app/page.tsx` - Homepage-Galerie
- `app/gallery/page.tsx` - Galerie-Bilder
- `app/services/page.tsx` - Service-Bilder

Laden Sie Ihre Bilder in den `public/images/` Ordner hoch und aktualisieren Sie die Pfade.

### Farben

Die Farben können in `tailwind.config.ts` angepasst werden. Die primäre Farbe ist aktuell Blau (`primary-600`).

## Deployment

Die Website kann auf verschiedenen Plattformen deployed werden:

- **Vercel** (empfohlen für Next.js)
- **Netlify**
- **Eigener Server** mit Node.js

Für Vercel:
1. Verbinden Sie Ihr GitHub-Repository
2. Vercel erkennt automatisch Next.js
3. Die Website wird automatisch deployed

## Lizenz

Dieses Projekt ist für den internen Gebrauch bestimmt.

