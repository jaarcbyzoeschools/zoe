import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ImageIcon, Maximize2 } from 'lucide-react'
import { cldPhoto, shapeToCssRatio } from '@/lib/cloudinary'
import { categoryLabel, type GalleryPhoto } from '@/data/gallery.data'

interface PhotoCardProps {
  photo: GalleryPhoto
  onOpen: () => void
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onOpen }) => {
  const [failed, setFailed] = useState(false)
  const url = cldPhoto(photo.src, { width: 700, shape: photo.shape })
  const showImage = url && !failed

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Open photo: ${photo.title}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="group relative block w-full overflow-hidden rounded-2xl bg-[#e6e1dc] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      style={{ aspectRatio: shapeToCssRatio(photo.shape) }}
    >
      {showImage ? (
        <img
          src={url}
          alt={photo.title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <ImageIcon className="h-6 w-6" />
        </div>
      )}

      {/* Caption: always visible on touch screens, on hover for desktop */}
      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/70 via-black/20 to-transparent p-4 opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
        <span className="mb-2 w-fit rounded-full bg-white/25 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
          {categoryLabel(photo.category)}
        </span>
        <p className="text-sm font-semibold text-white">{photo.title}</p>
      </div>

      <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-accent opacity-100 shadow transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100">
        <Maximize2 className="h-3.5 w-3.5" />
      </span>
    </motion.button>
  )
}

export default PhotoCard