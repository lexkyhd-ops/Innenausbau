'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
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
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before using portal
  useEffect(() => {
    setMounted(true)
  }, [])

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

      {/* Lightbox - Rendered via Portal to body for proper viewport positioning */}
      {mounted && selectedImage && createPortal(
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-[9999] flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedImage(null)}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            margin: 0,
            padding: 0
          }}
        >
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-gray-100 bg-black/70 rounded-full p-3 sm:p-3.5 backdrop-blur-sm transition-colors shadow-lg z-[10000] hover:bg-black/90"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
            aria-label="Schließen"
          >
            <FiX size={28} className="sm:w-8 sm:h-8 drop-shadow-lg" />
          </button>
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1200}
              height={800}
              className="object-contain max-h-[95vh] sm:max-h-[90vh] w-auto h-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              priority
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

