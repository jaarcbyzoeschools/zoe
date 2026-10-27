import React, { useEffect, useMemo, useState } from 'react'
import type { GalleryPhoto } from '@/data/gallery.data'
import { PhotoCard } from './PhotoCard'

const getColumnCount = () =>
  window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1

const useColumnCount = () => {
  const [count, setCount] = useState(getColumnCount)
  useEffect(() => {
    const onResize = () => setCount(getColumnCount())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return count
}

interface PhotoGridProps {
  photos: GalleryPhoto[]
  /** Index is the photo's position within `photos` (used by the lightbox) */
  onOpen: (index: number) => void
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onOpen }) => {
  const columnCount = useColumnCount()

  // Deal photos out one by one so adding more never reshuffles existing cards
  const columns = useMemo(() => {
    const cols: { photo: GalleryPhoto; index: number }[][] = Array.from(
      { length: columnCount },
      () => [],
    )
    photos.forEach((photo, index) => cols[index % columnCount].push({ photo, index }))
    return cols
  }, [photos, columnCount])

  if (photos.length === 0) {
    return <p className="py-20 text-center text-gray-500">No photos in this category yet.</p>
  }

  return (
    <div className="flex items-start gap-4 lg:gap-5">
      {columns.map((col, i) => (
        <div key={i} className="flex min-w-0 flex-1 flex-col gap-4 lg:gap-5">
          {col.map(({ photo, index }) => (
            <PhotoCard key={photo.id} photo={photo} onOpen={() => onOpen(index)} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default PhotoGrid