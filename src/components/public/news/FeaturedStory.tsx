import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ImageIcon } from 'lucide-react'
import { cldPhoto } from '@/lib/cloudinary'
import { shortDate } from '@/lib/dates'
import { newsCategoryLabel, type Article } from '@/data/news.data'

export const FeaturedStory: React.FC<{ article: Article }> = ({ article }) => {
  const [failed, setFailed] = useState(false)
  const url = cldPhoto(article.cover, { width: 1000, ratio: '4:3' })

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="grid gap-6 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm lg:grid-cols-2 lg:gap-10 lg:p-5"
    >
      <div className="relative min-h-60 overflow-hidden rounded-2xl bg-[#e6e1dc] lg:min-h-80">
        {url && !failed ? (
          <img
            src={url}
            alt={article.title}
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400">
            <ImageIcon className="h-6 w-6" />
            <span className="text-xs">Featured story photo</span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center lg:pr-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-medium text-white">
            Featured
          </span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-medium text-green-700">
            {newsCategoryLabel(article.category)}
          </span>
        </div>

        <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
          {article.title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">{article.excerpt}</p>

        <div className="mt-5 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
            {article.author.charAt(0)}
          </span>
          <div>
            <p className="text-xs font-semibold text-gray-900">{article.author}</p>
            <p className="text-[11px] text-gray-500">
              {shortDate(article.date)} · {article.readTime} min read
            </p>
          </div>
        </div>

        <Link
          to={`/news/${article.slug}`}
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
        >
          Read Story <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  )
}

export default FeaturedStory