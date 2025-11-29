import ImageGallery from '@/components/ImageGallery'
import { getAllImages } from '@/lib/getImages'

export default async function Gallery() {
  // Automatically load all images from the folders
  const images = await getAllImages()
  
  // Extract unique categories
  const categories = Array.from(new Set(images.map(img => img.category)))

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Unsere Referenzen
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Einblicke in unsere erfolgreich abgeschlossenen Projekte. 
            Von Spachteltechnik über Trockenbau und Malerarbeit bis hin zum Terrassenbau.
          </p>
        </div>

        <ImageGallery images={images} categories={categories} />
      </div>
    </div>
  )
}
