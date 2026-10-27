import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, type PanInfo, type Variants } from 'framer-motion'
import { ChevronLeft, ChevronRight, ImageIcon, X } from 'lucide-react'
import { cldPhoto } from '@/lib/cloudinary'
import { categoryLabel, type GalleryPhoto } from '@/data/gallery.data'

interface LightboxProps {
  photos: GalleryPhoto[]
  /** Index of the open photo, or null when closed */
  index: number | null
  onClose: () => void
  onIndexChange: (index: number) => void
}

const SWIPE_DISTANCE = 80
const SWIPE_VELOCITY = 500

const slide: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
}

export const Lightbox: React.FC<LightboxProps> = ({ photos, index, onClose, onIndexChange }) => {
  const isOpen = index !== null
  const total = photos.length
  const current = index !== null ? photos[index] : undefined
  const [direction, setDirection] = useState(1)
  const closeRef = useRef<HTMLButtonElement>(null)

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null || total < 2) return
      setDirection(dir)
      onIndexChange((index + dir + total) % total)
    },
    [index, total, onIndexChange],
  )

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, go, onClose])

  // Lock page scroll while open, and return focus to the card afterwards
  useEffect(() => {
    if (!isOpen) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [isOpen])

  // Preload the neighbouring photos so next/prev feels instant
  useEffect(() => {
    if (index === null || total < 2) return
    ;[(index + 1) % total, (index - 1 + total) % total].forEach((i) => {
      const url = cldPhoto(photos[i].src, { width: 1600 })
      if (url) new Image().src = url
    })
  }, [index, photos, total])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(1)
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(-1)
  }

  const url = current ? cldPhoto(current.src, { width: 1600 }) : ''

  return createPortal(
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 text-white sm:p-6">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
              {(index ?? 0) + 1} / {total}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Prev / Next */}
          {total > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation()
                  go(-1)
                }}
                className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6 sm:h-12 sm:w-12"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation()
                  go(1)
                }}
                className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6 sm:h-12 sm:w-12"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Photo (swipeable) */}
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.figure
              key={current.id}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              drag={total > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={handleDragEnd}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full w-full max-w-5xl cursor-grab flex-col items-center px-14 py-20 active:cursor-grabbing sm:px-24"
            >
              {url ? (
                <img
                  src={url}
                  alt={current.title}
                  draggable={false}
                  className="max-h-[70vh] w-auto max-w-full select-none rounded-xl object-contain shadow-2xl"
                />
              ) : (
                <div className="flex aspect-[4/3] w-full max-w-2xl items-center justify-center rounded-xl bg-[#e6e1dc] text-gray-400">
                  <ImageIcon className="h-10 w-10" />
                </div>
              )}

              <figcaption className="mt-5 text-center text-white">
                <span className="mb-2 inline-block rounded-full bg-white/15 px-3 py-0.5 text-[11px] font-medium">
                  {categoryLabel(current.category)}
                </span>
                <p className="text-base font-semibold sm:text-lg">{current.title}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default Lightbox