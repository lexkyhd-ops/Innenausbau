import ContactForm from '@/components/ContactForm'
import GoogleMaps from '@/components/GoogleMaps'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Contact() {
  return (
    <div className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">
            Kontakt
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Haben Sie Fragen oder möchten Sie ein Angebot? Wir sind gerne für Sie da!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto items-stretch">
          {/* Contact Form */}
          <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 rounded-2xl shadow-no-offset overflow-hidden border border-primary-100 pulse-blue flex flex-col order-1">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-300/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            
            <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col flex-grow">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-5 md:mb-6">
              Nachricht senden
            </h2>
            <div className="flex-grow">
              <ContactForm />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 rounded-2xl shadow-no-offset overflow-hidden border border-primary-100 pulse-blue flex flex-col order-2">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-300/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            
            <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col flex-grow">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-5 md:mb-6">
              Kontaktinformationen
            </h2>
              <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-6 sm:mb-8 flex-grow">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-primary-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <FiPhone className="text-primary-600 text-lg sm:text-xl" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Telefon</h3>
                    <a href="tel:+436641325995" className="text-primary-600 hover:text-primary-700 underline decoration-2 underline-offset-2 transition-colors font-medium text-sm sm:text-base block mb-1">
                      +436641325995
                    </a>
                    <p className="text-xs sm:text-sm text-gray-500">Wir antworten gerne auf Ihre Anfrage</p>
                </div>
              </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-primary-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <FiMail className="text-primary-600 text-lg sm:text-xl" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">E-Mail</h3>
                    <a href="mailto:kontakt@berishakg.at" className="text-primary-600 hover:text-primary-700 underline decoration-2 underline-offset-2 transition-colors font-medium text-sm sm:text-base block mb-1 break-all">
                      kontakt@berishakg.at
                    </a>
                    <p className="text-xs sm:text-sm text-gray-500">Wir antworten innerhalb von 24 Stunden</p>
                </div>
              </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-primary-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <FiMapPin className="text-primary-600 text-lg sm:text-xl" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Adresse</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Favoritenstraße 155 22-24<br />
                    1100 Wien, Österreich
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
              <div className="relative z-10">
                <GoogleMaps />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

