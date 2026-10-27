import React, { useMemo, useState } from 'react'
import { GraduationCap } from 'lucide-react'
import { PageHero } from '@/components/common/PageHero'
import { GalleryFilters, type Filter } from '@/components/public/gallery/GalleryFilters'
import { PhotoGrid } from '@/components/public/gallery/PhotoGrid'
import { Lightbox } from '@/components/public/gallery/LightBox'
import { VideoSection } from '@/components/public/gallery/VideoSection'
import { VideoModal } from '@/components/public/gallery/VideoModal'
import { photos, videos, type GalleryVideo } from '@/data/gallery.data'

const PAGE_SIZE = 9

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [activeVideo, setActiveVideo] = useState<GalleryVideo | null>(null)

  const filtered = useMemo(
    () => (filter === 'all' ? photos : photos.filter((p) => p.category === filter)),
    [filter],
  )
  const visible = filtered.slice(0, visibleCount)

  const handleFilter = (next: Filter) => {
    setFilter(next)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <>
      <PageHero
        badge="Gallery"
        badgeIcon={<GraduationCap />}
        title="Explore Our"
        highlight="Campus Life"
        subtitle="A glimpse into our classrooms, activities, excursions, celebrations and everyday learning moments across our 8 campuses."
      >
        <GalleryFilters active={filter} onChange={handleFilter} />
      </PageHero>

      <section className="bg-cream pb-16 lg:pb-24">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          {/* key resets the entrance animation when the filter changes */}
          <PhotoGrid key={filter} photos={visible} onOpen={setLightboxIndex} />

          {visibleCount < filtered.length && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-accent transition-colors hover:border-accent/50 hover:bg-accent/5"
              >
                Load More Photos
              </button>
            </div>
          )}
        </div>

      </section>
      <VideoSection videos={videos} onPlay={setActiveVideo} />
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
        <Lightbox
        photos={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </>
  )
}

export default Gallery