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
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Unsere Leistungen
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Von der Planung bis zur Fertigstellung – wir bieten professionelle Handwerksarbeiten 
            in höchster Qualität für alle Ihre Projekte.
          </p>
        </div>

        <div className="space-y-24">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
            >
              <div className="flex-1">
                <div className="mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    {service.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  {service.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Leistungsumfang
                    </h3>
                    <ul className="space-y-2">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">✓</span>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Anwendungsbereiche
                    </h3>
                    <ul className="space-y-2">
                      {service.applications.map((app, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">✓</span>
                          <span className="text-gray-700">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative rounded-lg aspect-square overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-primary-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Haben Sie Fragen zu unseren Leistungen?
          </h3>
          <p className="text-gray-600 mb-6">
            Kontaktieren Sie uns für eine kostenlose Beratung und ein individuelles Angebot.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors shadow-lg"
          >
            Jetzt Kontakt aufnehmen
          </a>
        </div>
      </div>
    </div>
  )
}

