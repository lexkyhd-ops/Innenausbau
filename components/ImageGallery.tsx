'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FiX } from 'react-icons/fi'

interface ImageItem {
  src: string
  alt: string
  category: string
}

interface ImageGalleryProps {
  images: ImageItem[]
  categories?: string[]
}

export default function ImageGallery({ images, categories = [] }: ImageGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('alle')
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)

  // Listen for filter changes from GalleryFilters component
  useEffect(() => {
    const handleFilterChange = (event: CustomEvent) => {
      setSelectedCategory(event.detail)
    }
    window.addEventListener('gallery-filter-change', handleFilterChange as EventListener)
    return () => {
      window.removeEventListener('gallery-filter-change', handleFilterChange as EventListener)
    }
  }, [])

  const filteredImages = selectedCategory === 'alle' 
    ? images 
    : images.filter(img => img.category === selectedCategory)

  return (
    <div>
      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg sm:rounded-xl group"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-100 bg-black/60 rounded-full p-2 sm:p-2.5 backdrop-blur-sm transition-colors shadow-lg z-10"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
            aria-label="Schließen"
          >
            <FiX size={24} className="sm:w-8 sm:h-8 drop-shadow-lg" />
          </button>
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1200}
              height={800}
              className="object-contain max-h-[95vh] sm:max-h-[90vh] w-auto h-auto"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}

