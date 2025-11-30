import Hero from '@/components/Hero'
import Link from 'next/link'
import Image from 'next/image'
import RotatingGallery from '@/components/RotatingGallery'
import StatisticsSection from '@/components/StatisticsSection'
import TrustedCompanies from '@/components/TrustedCompanies'
import { getImagesByCategory } from '@/lib/getImages'

export default async function Home() {
  // Automatically load images by category
  const galleryImagesByCategory = await getImagesByCategory()
  const services = [
    {
      title: 'Trockenbau',
      description: 'Professionelle Trockenbauarbeiten für perfekte Wände und Decken. Wir sorgen für eine makellose Oberfläche.',
      href: '/services#spachteln',
      image: 'https://images.unsplash.com/photo-1733431772808-82d878e59000?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      bgColor: 'bg-primary-700',
    },
    {
      title: 'Malern',
      description: 'Innen- und Außenanstrich in höchster Qualität. Von der Vorbereitung bis zum finalen Anstrich.',
      href: '/services#malern',
      image: 'https://images.unsplash.com/photo-1652829069862-87874e119527?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      bgColor: 'bg-primary-600',
    },
    {
      title: 'Terrassenbau',
      description: 'Individuelle Terrassen aus Holz. Wir planen und bauen Ihre Traumterrasse.',
      href: '/services#terrassenbau',
      image: 'https://images.unsplash.com/photo-1734079692147-c6fc9438a2d0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      bgColor: 'bg-primary-700',
    },
  ]


  return (
    <div>
      <Hero />
      
      {/* Statistics Section */}
      <StatisticsSection
        stats={[
          { value: 15, suffix: '+', label: 'Jahre Erfahrung' },
          { value: 250, suffix: '+', label: 'Zufriedene Kunden' },
          { value: 500, suffix: '+', label: 'Abgeschlossene Projekte' },
          { value: 100, suffix: '%', label: 'Qualitätsgarantie' },
        ]}
      />
      
      {/* Services Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">
              Unsere Leistungen
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Professionelle Handwerksarbeiten mit jahrelanger Erfahrung und höchster Qualität
            </p>
          </div>
          
          {/* Grid Layout with alternating text and image blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-8 sm:mb-10 md:mb-12 overflow-hidden rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl">
            {services.map((service, index) => {
              const isTextFirst = index % 2 === 0
              const isFirst = index === 0
              const isLast = index === services.length - 1
              return (
                <div
                  key={service.title}
                  className="md:contents"
                >
                  {/* Mobile: Card Layout (Image + Text together) */}
                  <div className={`md:hidden overflow-hidden bg-white ${
                    isFirst ? 'rounded-t-2xl' : ''
                  } ${isLast ? 'rounded-b-2xl mb-0' : ''}`}>
                    {/* Image with Title Overlay */}
                    <div className="relative min-h-[200px] sm:min-h-[240px] overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                      {/* Title Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 flex items-end">
                        <div className="w-full p-4 sm:p-5">
                          <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    {/* Text Block */}
                    <div className={`${service.bgColor} text-white p-5 sm:p-6`}>
                      <p className="text-white/95 mb-5 text-sm sm:text-base leading-relaxed">
                        {service.description}
                      </p>
                      <Link
                        href={service.href}
                        className="inline-block border-2 border-white/90 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-white/15 hover:border-white transition-all duration-300 w-fit min-h-[44px] flex items-center justify-center"
                        aria-label={`Mehr erfahren über ${service.title}`}
                      >
                        MEHR ERFAHREN
                      </Link>
                    </div>
                  </div>

                  {/* Desktop: Alternating Layout */}
                  {isTextFirst ? (
                    <>
                      {/* Text Block */}
                      <div className={`hidden md:flex ${service.bgColor} text-white p-10 lg:p-14 xl:p-16 flex-col justify-center min-h-[450px] lg:min-h-[500px] ${
                        isFirst ? 'rounded-tl-3xl' : ''
                      }`}>
                        <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-5 lg:mb-6 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-white/95 mb-7 lg:mb-8 text-lg lg:text-xl leading-relaxed font-light max-w-lg">
                          {service.description}
                        </p>
                        <Link
                          href={service.href}
                          className="inline-block border-2 border-white/90 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-white/15 hover:border-white transition-all duration-300 w-fit shadow-lg hover:shadow-xl hover:scale-105"
                          aria-label={`Mehr erfahren über ${service.title}`}
                        >
                          MEHR ERFAHREN
                        </Link>
                      </div>
                      {/* Image Block */}
                      <div className={`hidden md:block relative min-h-[450px] lg:min-h-[500px] overflow-hidden group ${
                        isFirst ? 'rounded-tr-3xl' : ''
                      }`}>
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Image Block */}
                      <div className={`hidden md:block relative min-h-[450px] lg:min-h-[500px] overflow-hidden group ${
                        index === 1 ? 'rounded-tl-3xl' : ''
                      }`}>
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      {/* Text Block */}
                      <div className={`hidden md:flex ${service.bgColor} text-white p-10 lg:p-14 xl:p-16 flex-col justify-center min-h-[450px] lg:min-h-[500px] ${
                        index === 1 ? 'rounded-tr-3xl' : ''
                      }`}>
                        <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-5 lg:mb-6 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-white/95 mb-7 lg:mb-8 text-lg lg:text-xl leading-relaxed font-light max-w-lg">
                          {service.description}
                        </p>
                        <Link
                          href={service.href}
                          className="inline-block border-2 border-white/90 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-white/15 hover:border-white transition-all duration-300 w-fit shadow-lg hover:shadow-xl hover:scale-105"
                          aria-label={`Mehr erfahren über ${service.title}`}
                        >
                          MEHR ERFAHREN
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          {/* CTA Button Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-0 mt-0">
            <Link
              href="/services"
              className="bg-primary-500 p-5 sm:p-6 md:p-8 flex items-center justify-center min-h-[60px] sm:min-h-[80px] md:min-h-[120px] rounded-full md:rounded-l-full md:rounded-r-none text-white text-base sm:text-lg md:text-xl font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
            >
              Alle Leistungen ansehen →
            </Link>
            <Link
              href="/contact"
              className="bg-primary-600 p-5 sm:p-6 md:p-8 flex items-center justify-center min-h-[60px] sm:min-h-[80px] md:min-h-[120px] rounded-full md:rounded-r-full md:rounded-l-none text-white text-base sm:text-lg md:text-xl font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
            >
              Kostenloses Angebot →
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">
              Unsere Referenzen
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Einblicke in unsere erfolgreich abgeschlossenen Projekte
            </p>
          </div>
          <RotatingGallery imagesByCategory={galleryImagesByCategory} interval={4000} />
          <div className="text-center mt-6 sm:mt-8">
            <Link
              href="/gallery"
              className="inline-block bg-transparent border-2 border-primary-600 text-primary-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors text-sm sm:text-base min-h-[44px]"
            >
              Galerie ansehen
            </Link>
          </div>
        </div>
      </section>

    {/* Trusted Companies Section */}
    <TrustedCompanies
      companies={[
            { name: "ISTA", logo: "https://ista.ac.at/wp-content/themes/wp-theme-ist-pubwww/assets/img/logo/ISTA_green3.svg" },
            { name: "Hofer Parkett", logo: "https://firmen.wko.at/upload_images/2d942355-ad5f-427a-a86e-d91ad00c8b34/65613b45-0662-4ac1-81ce-2856f726089e.png" },
            { name: "punkt9", logo: "https://www.punkt9.at/images/layout/branding_brown.jpg" },
            { name: "degen-engineering", logo: "https://static.wixstatic.com/media/9af3fd_ca567b3185ca46be87a86bcfa0f0dbde~mv2.png/v1/fill/w_770,h_126,al_c,lg_1,q_85,enc_avif,quality_auto/9af3fd_ca567b3185ca46be87a86bcfa0f0dbde~mv2.png" },
      ]}
    />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Bereit für Ihr nächstes Projekt?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Kontaktieren Sie uns für ein kostenloses Angebot
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 hover:text-primary-700 transition-colors shadow-lg"
          >
            Jetzt Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </div>
  )
}

