import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ReCaptchaProvider from '@/components/ReCaptchaProvider'
import CookieConsent from '@/components/CookieConsent'
import StructuredData from '@/components/StructuredData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trockenbauer - Maler - Terrassenbauer | Innenausbauberisha KG',
  description: 'Ihre Experten für Spachteln, Malern und Terrassenbau in Wien. Professionelle Handwerksarbeiten mit Qualität und Zuverlässigkeit. Kostenlose Angebote.',
  keywords: 'Innenausbau, Spachteln, Malern, Terrassenbau, Handwerker Wien, Renovierung Wien, Malerarbeiten Wien',
  authors: [{ name: 'Innenausbauberisha KG' }],
  creator: 'Innenausbauberisha KG',
  publisher: 'Innenausbauberisha KG',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.berishakg.at'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Trockenbauer - Maler - Terrassenbauer | Innenausbauberisha KG',
    description: 'Ihre Experten für Spachteln, Malern und Terrassenbau in Wien. Professionelle Handwerksarbeiten mit Qualität und Zuverlässigkeit.',
    url: 'https://www.berishakg.at',
    siteName: 'Innenausbauberisha KG',
    locale: 'de_AT',
    type: 'website',
    images: [
      {
        url: '/images/LogoHouseSimple.png',
        width: 1200,
        height: 630,
        alt: 'Innenausbauberisha KG Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trockenbauer - Maler - Terrassenbauer | Innenausbauberisha KG',
    description: 'Ihre Experten für Spachteln, Malern und Terrassenbau in Wien.',
    images: ['/images/LogoHouseSimple.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/LogoHouseSimple.png', type: 'image/png' },
    ],
    shortcut: '/images/LogoHouseSimple.png',
    apple: '/images/LogoHouseSimple.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>
        <ReCaptchaProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </ReCaptchaProvider>
      </body>
    </html>
  )
}

