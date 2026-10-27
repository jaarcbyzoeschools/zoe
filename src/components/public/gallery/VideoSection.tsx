import React from 'react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { VideoCard } from './VideoCard'
import type { GalleryVideo } from '@/data/gallery.data'

interface VideoSectionProps {
  videos: GalleryVideo[]
  onPlay: (video: GalleryVideo) => void
}

export const VideoSection: React.FC<VideoSectionProps> = ({ videos, onPlay }) => {
  const featured = videos.find((v) => v.featured) ?? videos[0]
  if (!featured) return null

  const others = videos.filter((v) => v.id !== featured.id).slice(0, 3)

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          title="Zoe in"
          highlight="Motion"
          subtitle="Assemblies, competitions, graduation and excursions — watch the highlights."
        />

        <div className="mt-10 space-y-5 lg:mt-12 lg:space-y-6">
          <VideoCard video={featured} variant="featured" onPlay={() => onPlay(featured)} />

          {others.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {others.map((video) => (
                <VideoCard key={video.id} video={video} onPlay={() => onPlay(video)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default VideoSection