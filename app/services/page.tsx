import Image from 'next/image'

export default function Services() {
  const services = [
    {
      id: 'spachteln',
      title: 'Trockenbau',
      description: 'Professionelle Trockenbauarbeiten für perfekte Oberflächen',
      image: 'https://images.unsplash.com/photo-1733431772808-82d878e59000?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      details: [
        'Spachteln von Wänden und Decken',
        'Ausbessern von Rissen und Löchern',
        'Glätten von unebenen Untergründen',
        'Vorbereitung für den Anstrich',
        'Feinspachteln für hochwertige Oberflächen',
      ],
      applications: [
        'Neubau',
        'Renovierung',
        'Sanierung',
        'Trockenbau',
      ],
    },
    {
      id: 'malern',
      title: 'Malern',
      description: 'Innen- und Außenanstrich in höchster Qualität',
      image: 'https://images.unsplash.com/photo-1652829069862-87874e119527?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      details: [
        'Innenanstrich von Wohn- und Geschäftsräumen',
        'Außenanstrich von Fassaden',
        'Vorbereitung und Grundierung',
        'Farbberatung und Planung',
        'Schutzanstrich für Holz und Metall',
      ],
      applications: [
        'Wohnräume',
        'Büros und Geschäfte',
        'Fassaden',
        'Holz- und Metallkonstruktionen',
      ],
    },
    {
      id: 'terrassenbau',
      title: 'Terrassenbau',
      description: 'Individuelle Terrassen aus Holz',
      image: 'https://images.unsplash.com/photo-1734079692147-c6fc9438a2d0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      details: [
        'Holzterrassen (z.B. Lärche, Douglasie, Bangkirai)',
        'Planung und Beratung',
        'Fundament und Unterbau',
        'Montage und Verlegung',
      ],
      applications: [
        'Gartenterrassen',
        'Balkonverkleidungen',
        'Poolumrandungen',
        'Wohnbereich im Freien',
      ],
    },
  ]

  return (
    <div className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">
            Unsere Leistungen
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Von der Planung bis zur Fertigstellung – wir bieten professionelle Handwerksarbeiten 
            in höchster Qualität für alle Ihre Projekte.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 rounded-2xl shadow-no-offset overflow-hidden border border-primary-100 pulse-blue"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-300/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
              
              <div className={`relative z-10 flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 p-6 sm:p-8 md:p-10 lg:p-12`}>
                {/* Image - shown first on mobile */}
                <div className="flex-1 w-full order-1 lg:order-none">
                  <div className="relative rounded-lg sm:rounded-xl aspect-[4/3] sm:aspect-square overflow-hidden shadow-lg">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 w-full order-2">
                  <div className="mb-4 sm:mb-5 md:mb-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-base sm:text-lg text-gray-600 mb-5 sm:mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                        Leistungsumfang
                      </h3>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {service.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary-600 mt-0.5 sm:mt-1 text-lg sm:text-xl flex-shrink-0">✓</span>
                            <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                        Anwendungsbereiche
                      </h3>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {service.applications.map((app, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary-600 mt-0.5 sm:mt-1 text-lg sm:text-xl flex-shrink-0">✓</span>
                            <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 md:mt-16 bg-primary-50 rounded-lg sm:rounded-xl p-6 sm:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
            Haben Sie Fragen zu unseren Leistungen?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6 leading-relaxed">
            Kontaktieren Sie uns für eine kostenlose Beratung und ein individuelles Angebot.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl min-h-[44px] text-sm sm:text-base"
          >
            Jetzt Kontakt aufnehmen
          </a>
        </div>
      </div>
    </div>
  )
}

