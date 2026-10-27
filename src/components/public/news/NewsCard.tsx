import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import { cldPhoto } from '@/lib/cloudinary'
import { shortDate } from '@/lib/dates'
import { newsCategoryLabel, type Article } from '@/data/news.data'

export const NewsCard: React.FC<{ article: Article }> = ({ article }) => {
  const [failed, setFailed] = useState(false)
  const url = cldPhoto(article.cover, { width: 700, ratio: '16:10' })

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <Link
        to={`/news/${article.slug}`}
        className="flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="relative aspect-16/10 overflow-hidden bg-[#e6e1dc]">
          {url && !failed ? (
            <img
              src={url}
              alt=""
              loading="lazy"
              onError={() => setFailed(true)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400">
              <ImageIcon className="h-6 w-6" />
              <span className="text-xs">Blog cover</span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-medium text-accent">
              {newsCategoryLabel(article.category)}
            </span>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-medium text-gray-600">
              {article.tag}
            </span>
          </div>

          <h3 className="mt-3 line-clamp-2 text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-accent">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">{article.excerpt}</p>

          <div className="mt-auto flex items-center justify-between pt-4 text-xs">
            <span className="text-gray-500">
              {shortDate(article.date)} · {article.readTime} min read
            </span>
            <span className="font-medium text-accent">Read more →</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default NewsCard