import React from 'react'
import { cldPhoto } from '@/lib/cloudinary'
import type { ArticleBlock } from '@/data/news.data'

export const ContentBlocks: React.FC<{ blocks: ArticleBlock[] }> = ({ blocks }) => (
  <div className="space-y-6">
    {blocks.map((block, i) => {
      switch (block.type) {
        case 'h2':
          return (
            <h2 key={i} className="pt-4 font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
              {block.text}
            </h2>
          )
        case 'quote':
          return (
            <blockquote key={i} className="rounded-r-xl border-l-4 border-[#02BB22] bg-cream py-5 pl-6 pr-5">
              <p className="font-serif text-lg italic leading-relaxed text-gray-800 sm:text-xl">
                “{block.text}”
              </p>
              {block.cite && (
                <footer className="mt-3 text-sm font-medium text-gray-500">— {block.cite}</footer>
              )}
            </blockquote>
          )
        case 'image': {
          const url = cldPhoto(block.src, { width: 1400 })
          if (!url) return null
          return (
            <figure key={i}>
              <img src={url} alt={block.caption ?? ''} loading="lazy" className="w-full rounded-2xl" />
              {block.caption && (
                <figcaption className="mt-2 text-center text-sm text-gray-500">{block.caption}</figcaption>
              )}
            </figure>
          )
        }
        default:
          return (
            <p key={i} className="text-base leading-[1.85] text-gray-700 sm:text-lg">
              {block.text}
            </p>
          )
      }
    })}
  </div>
)

export default ContentBlocks