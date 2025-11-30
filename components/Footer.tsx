import Link from 'next/link'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-gray-800 border-t border-slate-200">
      <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Innenausbauberisha</h3>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
              Innenausbauberisha KG<br />
              Favoritenstraße 155 22-24<br />
              1100 Wien<br />
              Österreich
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900">Schnellzugriff</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link href="/services" className="text-sm sm:text-base text-gray-700 hover:text-primary-600 transition-colors">
                  Leistungen
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm sm:text-base text-gray-700 hover:text-primary-600 transition-colors">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm sm:text-base text-gray-700 hover:text-primary-600 transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm sm:text-base text-gray-700 hover:text-primary-600 transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="text-sm sm:text-base text-gray-700 hover:text-primary-600 transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-sm sm:text-base text-gray-700 hover:text-primary-600 transition-colors">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 md:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900">Kontakt</h4>
            <ul className="space-y-2 sm:space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <FiPhone className="text-primary-600 flex-shrink-0" />
                <a href="tel:+436641325995" className="text-sm sm:text-base hover:text-primary-600 transition-colors">
                  +436641325995
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-primary-600 flex-shrink-0" />
                <a href="mailto:kontakt@berishakg.at" className="text-sm sm:text-base hover:text-primary-600 transition-colors break-all">
                  kontakt@berishakg.at
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin className="text-primary-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base">Favoritenstraße 155 22-24, 1100 Wien</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-600">
          <p className="text-xs sm:text-sm">&copy; {new Date().getFullYear()} Innenausbauberisha. Alle Rechte vorbehalten.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
            <Link href="/impressum" className="hover:text-primary-600 transition-colors">
              Impressum
            </Link>
            <span>•</span>
            <Link href="/datenschutz" className="hover:text-primary-600 transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

