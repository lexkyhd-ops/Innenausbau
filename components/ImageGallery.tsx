'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleFilterChange = (event: CustomEvent) => {
      setSelectedCategory(event.detail)
      setLightboxIndex(null)
    }
    window.addEventListener('gallery-filter-change', handleFilterChange as EventListener)
    return () => {
      window.removeEventListener('gallery-filter-change', handleFilterChange as EventListener)
    }
  }, [])

  const filteredImages =
    selectedCategory === 'alle' ? images : images.filter((img) => img.category === selectedCategory)

  useEffect(() => {
    if (lightboxIndex !== null && lightboxIndex >= filteredImages.length) {
      setLightboxIndex(null)
    }
  }, [filteredImages.length, lightboxIndex])

  useEffect(() => {
    if (lightboxIndex === null) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [lightboxIndex])

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goNext = useCallback(() => {
    setLightboxIndex((idx) => {
      if (idx === null || filteredImages.length <= 1) return idx
      return (idx + 1) % filteredImages.length
    })
  }, [filteredImages.length])

  const goPrev = useCallback(() => {
    setLightboxIndex((idx) => {
      if (idx === null || filteredImages.length <= 1) return idx
      return (idx - 1 + filteredImages.length) % filteredImages.length
    })
  }, [filteredImages.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeLightbox()
        return
      }
      if (filteredImages.length <= 1) return
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, filteredImages.length, closeLightbox, goNext, goPrev])

  const selectedImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null
  const showCarouselNav = filteredImages.length > 1

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !showCarouselNav) return
    const endX = e.changedTouches[0].clientX
    const dx = endX - touchStartX.current
    touchStartX.current = null
    const threshold = 48
    if (Math.abs(dx) < threshold) return
    if (dx > 0) goPrev()
    else goNext()
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg sm:rounded-xl group"
            onClick={() => setLightboxIndex(index)}
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

      {mounted &&
        selectedImage &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Bildergalerie"
            className="fixed inset-0 bg-black bg-opacity-95 z-[9999] flex items-center justify-center p-2 sm:p-4"
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 0,
              padding: 0,
            }}
          >
            <button
              type="button"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-gray-100 bg-black/70 rounded-full p-3 sm:p-3.5 backdrop-blur-sm transition-colors shadow-lg z-[10001] hover:bg-black/90 min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
              aria-label="Schließen"
            >
              <FiX size={28} className="sm:w-8 sm:h-8 drop-shadow-lg" />
            </button>

            {showCarouselNav && (
              <>
                <button
                  type="button"
                  className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-[10001] rounded-full bg-black/55 hover:bg-black/75 active:bg-black/85 text-white p-3 sm:p-3.5 md:p-4 backdrop-blur-sm transition-colors shadow-lg border border-white/15 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                  onClick={(e) => {
                    e.stopPropagation()
                    goPrev()
                  }}
                  aria-label="Vorheriges Bild"
                >
                  <FiChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-md" aria-hidden />
                </button>
                <button
                  type="button"
                  className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-[10001] rounded-full bg-black/55 hover:bg-black/75 active:bg-black/85 text-white p-3 sm:p-3.5 md:p-4 backdrop-blur-sm transition-colors shadow-lg border border-white/15 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                  onClick={(e) => {
                    e.stopPropagation()
                    goNext()
                  }}
                  aria-label="Nächstes Bild"
                >
                  <FiChevronRight className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-md" aria-hidden />
                </button>
              </>
            )}

            <div
              className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center px-14 sm:px-16 md:px-20"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div
                key={lightboxIndex}
                className="gallery-lightbox-enter relative flex items-center justify-center max-h-[95vh] sm:max-h-[90vh] w-full"
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[95vh] sm:max-h-[90vh] w-auto h-auto max-w-full rounded-lg shadow-2xl select-none"
                  draggable={false}
                  priority
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
