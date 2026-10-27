import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Film, X } from 'lucide-react'
import { cldVideo, cldVideoPoster } from '@/lib/cloudinary'
import type { GalleryVideo } from '@/data/gallery.data'

interface VideoModalProps {
  video: GalleryVideo | null
  onClose: () => void
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const isOpen = video !== null
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus?.()
    }
  }, [isOpen, onClose])

  const src = video ? cldVideo(video.src) : ''

  return createPortal(
    <AnimatePresence>
      {video && (
        <motion.div
          key="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl"
          >
            <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
              {src ? (
                <video
                  src={src}
                  poster={cldVideoPoster(video.src, 1280)}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="h-full w-full"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-white/60">
                  <Film className="h-10 w-10" />
                  <p className="text-sm">This video isn't available yet.</p>
                </div>
              )}
            </div>
            <p className="mt-4 text-center text-base font-semibold text-white sm:text-lg">
              {video.title}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default VideoModal