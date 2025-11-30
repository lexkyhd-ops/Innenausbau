import ImageGallery from '@/components/ImageGallery'
import { getAllImages } from '@/lib/getImages'
import GalleryFilters from '@/components/GalleryFilters'

export default async function Gallery() {
  // Automatically load all images from the folders
  const images = await getAllImages()
  
  // Extract unique categories
  const categories = Array.from(new Set(images.map(img => img.category)))

  return (
    <div className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4">
            Unsere Referenzen
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Einblicke in unsere erfolgreich abgeschlossenen Projekte. 
            Von Spachteltechnik über Trockenbau und Malerarbeit bis hin zum Terrassenbau.
          </p>
        </div>

        {/* Category Filter - Outside the box */}
        <GalleryFilters categories={categories} />

        <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 rounded-2xl shadow-no-offset overflow-hidden border border-primary-100 pulse-blue">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-300/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <div className="relative z-10 p-6 sm:p-8 md:p-10">
        <ImageGallery images={images} categories={categories} />
          </div>
        </div>
      </div>
    </div>
  )
}
