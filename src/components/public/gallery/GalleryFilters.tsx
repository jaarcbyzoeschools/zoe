import React from 'react'
import { PHOTO_CATEGORIES, type PhotoCategory } from '@/data/gallery.data'

export type Filter = 'all' | PhotoCategory

interface GalleryFiltersProps {
  active: Filter
  onChange: (filter: Filter) => void
}

export const GalleryFilters: React.FC<GalleryFiltersProps> = ({ active, onChange }) => (
  <div
    role="group"
    aria-label="Filter photos by category"
    className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  >
    {PHOTO_CATEGORIES.map(({ id, label }) => {
      const isActive = active === id
      return (
        <button
          key={id}
          type="button"
          aria-pressed={isActive}
          onClick={() => onChange(id)}
          className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm ${
            isActive
              ? 'border-accent bg-accent text-white shadow-sm'
              : 'border-gray-200 bg-white text-gray-700 hover:border-accent/50 hover:text-accent'
          }`}
        >
          {label}
        </button>
      )
    })}
  </div>
)

export default GalleryFilters