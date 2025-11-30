'use client'

import { useState } from 'react'

interface GalleryFiltersProps {
  categories: string[]
}

export default function GalleryFilters({ categories }: GalleryFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('alle')

  // Update URL hash when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    // Update the gallery filter via custom event
    window.dispatchEvent(new CustomEvent('gallery-filter-change', { detail: category }))
  }

  if (categories.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8 justify-center">
      <button
        onClick={() => handleCategoryChange('alle')}
        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base min-h-[36px] ${
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
          onClick={() => handleCategoryChange(category)}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base min-h-[36px] ${
            selectedCategory === category
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

