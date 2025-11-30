import ContactForm from '@/components/ContactForm'
import GoogleMaps from '@/components/GoogleMaps'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Contact() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Kontakt
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Haben Sie Fragen oder möchten Sie ein Angebot? Wir sind gerne für Sie da!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-stretch">
          {/* Contact Form */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Nachricht senden
            </h2>
            <div className="flex-grow">
              <ContactForm />
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Kontaktinformationen
            </h2>
            <div className="space-y-6 mb-8 flex-grow">
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <FiPhone className="text-primary-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Telefon</h3>
                  <p className="text-gray-600">+436641325995</p>
                  <p className="text-sm text-gray-500">Wir antworten gerne auf Ihre Anfrage</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <FiMail className="text-primary-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">E-Mail</h3>
                  <p className="text-gray-600">innenausbauberisha-kg@hotmail.com</p>
                  <p className="text-sm text-gray-500">Wir antworten innerhalb von 24 Stunden</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <FiMapPin className="text-primary-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Adresse</h3>
                  <p className="text-gray-600">
                    Favoritenstraße 155 22-24<br />
                    1100 Wien, Österreich
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <GoogleMaps />
          </div>
        </div>
      </div>
    </div>
  )
}

