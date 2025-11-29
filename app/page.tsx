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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Unsere Leistungen
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professionelle Handwerksarbeiten mit jahrelanger Erfahrung und höchster Qualität
            </p>
          </div>
          
          {/* Grid Layout with alternating text and image blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-12">
            {services.map((service, index) => {
              const isTextFirst = index % 2 === 0
              return (
                <>
                  {isTextFirst ? (
                    <>
                      {/* Text Block */}
                      <div key={`${service.title}-text`} className={`${service.bgColor} text-white p-8 md:p-12 flex flex-col justify-center min-h-[400px]`}>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h3>
                        <p className="text-white/90 mb-6 text-lg">{service.description}</p>
                        <Link
                          href={service.href}
                          className="inline-block border border-white text-white px-6 py-2.5 rounded-md font-medium hover:bg-white/10 transition-colors w-fit"
                        >
                          MEHR ERFAHREN
                        </Link>
                      </div>
                      {/* Image Block */}
                      <div key={`${service.title}-image`} className="relative min-h-[400px]">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Image Block */}
                      <div key={`${service.title}-image`} className="relative min-h-[400px]">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                      {/* Text Block */}
                      <div key={`${service.title}-text`} className={`${service.bgColor} text-white p-8 md:p-12 flex flex-col justify-center min-h-[400px]`}>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h3>
                        <p className="text-white/90 mb-6 text-lg">{service.description}</p>
                        <Link
                          href={service.href}
                          className="inline-block border border-white text-white px-6 py-2.5 rounded-md font-medium hover:bg-white/10 transition-colors w-fit"
                        >
                          MEHR ERFAHREN
                        </Link>
                      </div>
                    </>
                  )}
                </>
              )
            })}
          </div>

          {/* CTA Button Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-0">
            <Link
              href="/services"
              className="bg-primary-500 p-6 md:p-8 flex items-center justify-center min-h-[120px] rounded-l-full md:rounded-l-full rounded-r-none text-white text-lg md:text-xl font-medium hover:opacity-90 transition-opacity"
            >
              Alle Leistungen ansehen →
            </Link>
            <Link
              href="/contact"
              className="bg-primary-600 p-6 md:p-8 flex items-center justify-center min-h-[120px] rounded-r-full md:rounded-r-full rounded-l-none text-white text-lg md:text-xl font-medium hover:opacity-90 transition-opacity"
            >
              Kostenloses Angebot →
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Unsere Referenzen
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Einblicke in unsere erfolgreich abgeschlossenen Projekte
            </p>
          </div>
          <RotatingGallery imagesByCategory={galleryImagesByCategory} interval={4000} />
          <div className="text-center">
            <Link
              href="/gallery"
              className="inline-block bg-transparent border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors"
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

