import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { cldVideoPoster } from '@/lib/cloudinary'
import type { GalleryVideo } from '@/data/gallery.data'

interface VideoCardProps {
  video: GalleryVideo
  variant?: 'featured' | 'small'
  onPlay: () => void
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, variant = 'small', onPlay }) => {
  const [failed, setFailed] = useState(false)
  const featured = variant === 'featured'
  const poster = cldVideoPoster(video.src, featured ? 1400 : 700)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <button
        type="button"
        onClick={onPlay}
        aria-label={`Play video: ${video.title}`}
        className={`group relative block w-full overflow-hidden bg-[#e6e1dc] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          featured ? 'aspect-video rounded-3xl lg:aspect-[2/1]' : 'aspect-video rounded-2xl'
        }`}
      >
        {poster && !failed && (
          <img
            src={poster}
            alt=""
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        {/* Play button */}
        <span
          className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-accent shadow-xl transition-transform duration-300 group-hover:scale-110 ${
            featured ? 'h-16 w-16 sm:h-20 sm:w-20' : 'h-10 w-10 sm:h-12 sm:w-12'
          }`}
        >
          <Play className={`fill-current ${featured ? 'h-6 w-6 sm:h-7 sm:w-7' : 'h-4 w-4 sm:h-5 sm:w-5'}`} />
        </span>

        {featured ? (
          <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
            {video.tag && (
              <span className="mb-3 inline-block rounded-full bg-white/25 px-3 py-1 text-[11px] font-medium backdrop-blur-sm">
                {video.tag}
              </span>
            )}
            <h3 className="text-xl font-bold sm:text-2xl lg:text-3xl">{video.title}</h3>
            <p className="mt-1.5 text-xs text-white/80 sm:text-sm">
              {video.duration}
              {video.location && ` · ${video.location}`}
            </p>
          </div>
        ) : (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white">
            {video.duration}
          </span>
        )}
      </button>

      {!featured && (
        <h4 className="mt-3 text-sm font-semibold text-gray-900 sm:text-base">{video.title}</h4>
      )}
    </motion.div>
  )
}

export default VideoCard