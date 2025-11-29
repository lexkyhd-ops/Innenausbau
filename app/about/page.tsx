import { FiAward, FiUsers, FiClock, FiCheckCircle, FiUser, FiPhone } from 'react-icons/fi'

export default function About() {
  const features = [
    {
      icon: <FiAward className="text-4xl text-primary-600" />,
      title: 'Erfahrung',
      description: 'Über 15 Jahre Erfahrung in allen Bereichen des Handwerks',
    },
    {
      icon: <FiUsers className="text-4xl text-primary-600" />,
      title: 'Qualität',
      description: 'Höchste Qualitätsstandards bei jedem Projekt',
    },
    {
      icon: <FiClock className="text-4xl text-primary-600" />,
      title: 'Zuverlässigkeit',
      description: 'Pünktliche Termineinhaltung und professionelle Abwicklung',
    },
    {
      icon: <FiCheckCircle className="text-4xl text-primary-600" />,
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
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Unsere Geschichte
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Innenausbauberisha wurde mit der Vision gegründet, hochwertige Handwerksarbeiten 
                in Wien und Umgebung anzubieten. Was als Einzelunternehmen begann, hat sich zu 
                einem zuverlässigen Partner für alle Arten von Innenausbau- und Renovierungsarbeiten entwickelt.
              </p>
              <p>
                Mit über 15 Jahren Erfahrung in den Bereichen Trockenbau, Malern und Terrassenbau 
                bringen wir jedes Projekt mit Fachkompetenz, Sorgfalt und Präzision zur Perfektion. 
                Wir legen großen Wert auf Qualität, Pünktlichkeit und Kundenzufriedenheit.
              </p>
              <p>
                Ob Neubau, Renovierung oder Sanierung – wir beraten Sie gerne persönlich und 
                erstellen ein individuelles, transparentes Angebot für Ihr Projekt. Als 
                Einzelunternehmen können wir flexibel auf Ihre Wünsche eingehen und garantieren 
                eine persönliche Betreuung von der Planung bis zur Fertigstellung.
              </p>
              <p>
                Vertrauen Sie auf unsere Erfahrung und lassen Sie uns gemeinsam Ihre Vision 
                verwirklichen. Wir freuen uns darauf, auch Ihr Projekt zu einem Erfolg zu machen.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
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
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-700">
                <FiPhone className="text-primary-600" />
                <a href="tel:+436641325995" className="hover:text-primary-600 transition-colors">
                  +436641325995
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

