import Link from 'next/link'
import Image from 'next/image'
import titleImage from '@/app/images/TitleImage.jpg'

export default function Hero() {
  return (
    <section className="relative text-white py-20 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={titleImage}
          alt="Innenausbauberisha"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-800/70 to-primary-900/80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Professionelle Handwerksarbeiten
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Von Spachteln und Malern bis hin zum Terrassenbau – 
            wir bringen Ihre Projekte zur Perfektion
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary-700 px-6 py-2.5 rounded-md font-medium hover:bg-primary-50 transition-colors"
            >
              Kostenloses Angebot
            </Link>
            <Link
              href="/services"
              className="bg-transparent border border-white text-white px-6 py-2.5 rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              Unsere Leistungen
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

