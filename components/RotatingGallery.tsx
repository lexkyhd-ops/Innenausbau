'use client'

import { useState, useEffect, useRef } from 'react'

interface ImageItem {
  src: string
  alt: string
  category: string
}

interface RotatingGalleryProps {
  imagesByCategory: {
    [category: string]: ImageItem[]
  }
  interval?: number
}

export default function RotatingGallery({ imagesByCategory, interval = 4000 }: RotatingGalleryProps) {
  const allCategories = Object.keys(imagesByCategory)
  const categories = allCategories.slice(0, 4)
  const [displayIndex, setDisplayIndex] = useState<{ [key: string]: number }>({})
  const [targetIndex, setTargetIndex] = useState<{ [key: string]: number }>({})
  const transitionRef = useRef<{ [key: string]: boolean }>({})
  const displayIndexRef = useRef<{ [key: string]: number }>({})

  // Initialize
  useEffect(() => {
    const initial: { [key: string]: number } = {}
    categories.forEach((category) => {
      const images = imagesByCategory[category]
      if (images && images.length > 0) {
        initial[category] = 0
        transitionRef.current[category] = false
      }
    })
    setDisplayIndex(initial)
    setTargetIndex(initial)
    displayIndexRef.current = initial
  }, []) // Only run once on mount

  // Rotate images
  useEffect(() => {
    console.log('[RotatingGallery] Setting up rotation timers', { categories: categories.join(','), interval })
    if (categories.length === 0) return

    const cleanupFunctions: (() => void)[] = []

    categories.forEach((category, categoryIndex) => {
      const images = imagesByCategory[category]
      if (!images || images.length <= 1) return

      const startDelay = categoryIndex * 1000
      console.log(`[RotatingGallery] Setting up timer for ${category}, startDelay: ${startDelay}ms`)

      const startTimer = setTimeout(() => {
        console.log(`[RotatingGallery] Starting rotation for ${category}`)
        const rotate = () => {
          const isCurrentlyTransitioning = transitionRef.current[category]
          console.log(`[RotatingGallery] rotate() called for ${category}, isTransitioning: ${isCurrentlyTransitioning}`)
          
          // Skip if transition is already active
          if (isCurrentlyTransitioning) {
            console.log(`[RotatingGallery] ⚠️ Skipping ${category} - transition already active`)
            return
          }

          // Get current index from ref (always up to date)
          const current = displayIndexRef.current[category] ?? 0
          const next = (current + 1) % images.length

          console.log(`[RotatingGallery] 🎬 Starting transition for ${category}: ${current} -> ${next}`)

          // Mark transition as active IMMEDIATELY (before any state updates)
          transitionRef.current[category] = true
          console.log(`[RotatingGallery] Set isTransitioning[${category}] = true`)

          // Set target index to trigger transition (outside of setDisplayIndex)
          setTargetIndex((prevTarget) => {
            const newTarget = {
              ...prevTarget,
              [category]: next,
            }
            console.log(`[RotatingGallery] Set targetIndex for ${category}:`, newTarget)
            return newTarget
          })

          // After fade completes, update indices and clear flag together
          setTimeout(() => {
            console.log(`[RotatingGallery] ✅ Transition complete for ${category}, updating displayIndex to ${next}`)
            
            // Update ref first
            displayIndexRef.current[category] = next
            
            // Clear transition flag IMMEDIATELY before state updates
            // This prevents rendering with displayIdx === targetIdx while isTransitioning is true
            transitionRef.current[category] = false
            console.log(`[RotatingGallery] Set isTransitioning[${category}] = false`)
            
            // Update both states together - React will batch these
            setDisplayIndex((prev) => {
              const updated = {
                ...prev,
                [category]: next,
              }
              console.log(`[RotatingGallery] Updated displayIndex for ${category}:`, updated)
              return updated
            })
            
            setTargetIndex((prev) => {
              const synced = {
                ...prev,
                [category]: next,
              }
              console.log(`[RotatingGallery] Synced targetIndex for ${category}:`, synced)
              return synced
            })
          }, 1000) // Match CSS transition duration (1s)
        }

        // Initial call
        const intervalId = setInterval(rotate, interval)
        console.log(`[RotatingGallery] Created interval for ${category}, interval: ${interval}ms`)
        cleanupFunctions.push(() => {
          console.log(`[RotatingGallery] Cleaning up interval for ${category}`)
          clearInterval(intervalId)
        })
      }, startDelay)

      cleanupFunctions.push(() => {
        console.log(`[RotatingGallery] Cleaning up startTimer for ${category}`)
        clearTimeout(startTimer)
      })
    })

    return () => {
      console.log('[RotatingGallery] Cleanup: clearing all timers')
      cleanupFunctions.forEach((cleanup) => cleanup())
    }
  }, [categories.join(','), interval]) // Removed imagesByCategory from deps

  if (categories.length === 0) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
      {categories.map((category) => {
        const images = imagesByCategory[category]
        if (!images || images.length === 0) return null

        const displayIdx = displayIndex[category] ?? 0
        const targetIdx = targetIndex[category] ?? 0
        const isTransitioning = transitionRef.current[category] ?? false

        // Debug log on render
        if (isTransitioning) {
          console.log(`[RotatingGallery] 🎨 Rendering ${category}: displayIdx=${displayIdx}, targetIdx=${targetIdx}, isTransitioning=${isTransitioning}`)
        }

        // During transition: displayIdx shows current (fading out), targetIdx shows next (fading in)
        // After transition: displayIdx and targetIdx should be the same, nextImage is for preloading
        const currentImage = images[displayIdx]
        // During transition: use targetIdx, otherwise calculate next for preloading
        const nextImage = isTransitioning ? images[targetIdx] : images[(displayIdx + 1) % images.length]

        if (!currentImage || !nextImage) return null

        return (
          <div
            key={category}
            className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl group bg-white"
            style={{
              boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 8px 2px rgba(0, 0, 0, 0.08), 0 1px 4px 1px rgba(0, 0, 0, 0.06)',
              transition: 'box-shadow 0.3s ease-in-out'
            }}
            onMouseEnter={(e) => {
              if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.05), 0 8px 20px 6px rgba(0, 0, 0, 0.15), 0 4px 10px 3px rgba(0, 0, 0, 0.12)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 8px 2px rgba(0, 0, 0, 0.08), 0 1px 4px 1px rgba(0, 0, 0, 0.06)'
            }}
          >
            {/* Current Image - fades out during transition */}
            <img
              key={`current-${category}-${displayIdx}`}
              src={currentImage.src}
              alt={currentImage.alt}
              className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ 
                transition: 'opacity 1s ease-in-out, transform 0.5s ease-in-out',
                zIndex: isTransitioning ? 1 : 2
              }}
            />
            {/* Next Image - fades in during transition */}
            <img
              key={`next-${category}-${isTransitioning ? targetIdx : (displayIdx + 1) % images.length}`}
              src={nextImage.src}
              alt={nextImage.alt}
              className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${
                isTransitioning ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                transition: 'opacity 1s ease-in-out, transform 0.5s ease-in-out',
                zIndex: isTransitioning ? 2 : 1,
                pointerEvents: isTransitioning ? 'auto' : 'none'
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
