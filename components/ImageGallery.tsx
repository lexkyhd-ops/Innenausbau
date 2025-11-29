'use client'

import { useState } from 'react'
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

  const filteredImages = selectedCategory === 'alle' 
    ? images 
    : images.filter(img => img.category === selectedCategory)

  return (
    <div>
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setSelectedCategory('alle')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === 'alle'
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Alle
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-100 bg-black/60 rounded-full p-2 backdrop-blur-sm transition-colors shadow-lg"
            onClick={() => setSelectedImage(null)}
            aria-label="Schließen"
          >
            <FiX size={32} className="drop-shadow-lg" />
          </button>
          <div className="relative max-w-7xl max-h-full">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1200}
              height={800}
              className="object-contain max-h-[90vh]"
            />
          </div>
        </div>
      )}
    </div>
  )
}

