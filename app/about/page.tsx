import { FiAward, FiUsers, FiClock, FiCheckCircle, FiUser, FiPhone } from 'react-icons/fi'

export default function About() {
  const features = [
    {
      icon: <FiAward className="text-3xl sm:text-4xl text-primary-600" />,
      title: 'Erfahrung',
      description: 'Über 15 Jahre Erfahrung in allen Bereichen des Handwerks',
    },
    {
      icon: <FiUsers className="text-3xl sm:text-4xl text-primary-600" />,
      title: 'Qualität',
      description: 'Höchste Qualitätsstandards bei jedem Projekt',
    },
    {
      icon: <FiClock className="text-3xl sm:text-4xl text-primary-600" />,
      title: 'Zuverlässigkeit',
      description: 'Pünktliche Termineinhaltung und professionelle Abwicklung',
    },
    {
      icon: <FiCheckCircle className="text-3xl sm:text-4xl text-primary-600" />,
      title: 'Zufriedenheit',
      description: 'Zufriedene Kunden sind unser größtes Anliegen',
    },
  ]

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Über uns
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professionelle Handwerksarbeiten mit Leidenschaft und Präzision
          </p>
        </div>

        {/* Company Story */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 rounded-2xl shadow-no-offset overflow-hidden border border-primary-100 pulse-blue">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-300/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            
            <div className="relative p-8 md:p-12 lg:p-16">
              {/* Header Section */}
              <div className="text-center mb-8 md:mb-12">
                <div className="inline-block bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Unsere Geschichte
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  Von der Vision zur Realität
                </h2>
                <div className="w-24 h-1 bg-primary-600 mx-auto rounded-full"></div>
              </div>

              {/* Content Grid */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Left Column - Main Story */}
                <div className="flex flex-col space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-primary-100 shadow-sm flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-primary-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                      Unsere Gründung
                    </h3>
                    <p className="text-gray-700 leading-relaxed flex-grow">
                      Innenausbauberisha wurde mit der Vision gegründet, hochwertige Handwerksarbeiten 
                      in Wien und Umgebung anzubieten. Was als Einzelunternehmen begann, hat sich zu 
                      einem zuverlässigen Partner für alle Arten von Innenausbau- und Renovierungsarbeiten entwickelt.
                    </p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-primary-100 shadow-sm flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-primary-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                      Unsere Expertise
                    </h3>
                    <p className="text-gray-700 leading-relaxed flex-grow">
                      Mit über 15 Jahren Erfahrung in den Bereichen Trockenbau, Malern und Terrassenbau 
                      bringen wir jedes Projekt mit Fachkompetenz, Sorgfalt und Präzision zur Perfektion. 
                      Wir legen großen Wert auf Qualität, Pünktlichkeit und Kundenzufriedenheit.
                    </p>
                  </div>
                </div>

                {/* Right Column - Values & Approach */}
                <div className="flex flex-col space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-primary-100 shadow-sm flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-primary-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                      Unser Versprechen
                    </h3>
                    <p className="text-gray-700 leading-relaxed flex-grow">
                      Ob Neubau, Renovierung oder Sanierung – wir beraten Sie gerne persönlich und 
                      erstellen ein individuelles, transparentes Angebot für Ihr Projekt. Als 
                      Einzelunternehmen können wir flexibel auf Ihre Wünsche eingehen und garantieren 
                      eine persönliche Betreuung von der Planung bis zur Fertigstellung.
                    </p>
                  </div>

                  {/* Highlight Box */}
                  <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-6 text-white shadow-lg flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      Ihre Vision, unsere Mission
                    </h3>
                    <p className="text-white/95 leading-relaxed flex-grow">
                      Vertrauen Sie auf unsere Erfahrung und lassen Sie uns gemeinsam Ihre Vision 
                      verwirklichen. Wir freuen uns darauf, auch Ihr Projekt zu einem Erfolg zu machen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 rounded-2xl shadow-no-offset overflow-hidden border border-primary-100 pulse-blue"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-200/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-300/20 rounded-full -ml-16 -mb-16 blur-2xl"></div>
              
              <div className="relative p-4 sm:p-5 md:p-6 text-center">
                <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Owner Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gray-50 rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Ihr Ansprechpartner
            </h2>
            <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8">
              Miftar Berisha ist der Komplementär des Unternehmens und steht Ihnen persönlich mit Erfahrung 
              und Leidenschaft für das Handwerk zur Verfügung. Jedes Projekt wird mit höchster 
              Sorgfalt und Qualität ausgeführt.
            </p>
            <div className="bg-white rounded-lg p-6 text-center max-w-md mx-auto">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FiUser className="text-6xl text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-lg">Miftar Berisha</h3>
              <p className="text-sm text-gray-600">Komplementär</p>
              <p className="text-sm text-gray-500 mt-2">Ihr zuverlässiger Partner für Handwerksarbeiten</p>
              <a 
                href="tel:+4368120740364" 
                className="inline-flex items-center justify-center gap-2 mt-4 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-md hover:shadow-lg min-h-[36px]"
                aria-label="Anrufen: +43 681 20740364"
              >
                <FiPhone className="text-base" />
                <span>+43 681 20740364</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

