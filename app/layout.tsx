import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ReCaptchaProvider from '@/components/ReCaptchaProvider'
import CookieConsent from '@/components/CookieConsent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trockenbauer - Maler - Terrassenbauer',
  description: 'Ihre Experten für Spachteln, Malern und Terrassenbau in Wien. Professionelle Handwerksarbeiten mit Qualität und Zuverlässigkeit. Kostenlose Angebote.',
  keywords: 'Innenausbau, Spachteln, Malern, Terrassenbau, Handwerker Wien, Renovierung Wien, Malerarbeiten Wien',
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

