import Link from 'next/link'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-gray-800 border-t border-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Innenausbauberisha</h3>
            <p className="text-gray-700 text-sm">
              Innenausbauberisha KG<br />
              Favoritenstraße 155 22-24<br />
              1100 Wien<br />
              Österreich
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Schnellzugriff</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Leistungen
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Kontakt</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <FiPhone className="text-primary-600" />
                <span>+436641325995</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-primary-600" />
                <span>kontakt@berishakg.at</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMapPin className="text-primary-600" />
                <span>Favoritenstraße 155 22-24, 1100 Wien</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Innenausbauberisha. Alle Rechte vorbehalten.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-4 text-sm">
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

