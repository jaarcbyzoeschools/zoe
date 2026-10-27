import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ImageIcon } from 'lucide-react'
import { NotFound } from '@pages/errors'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ContentBlocks } from '@/components/common/ContentBlocks'
import { ShareButtons } from '@/components/common/ShareButtons'
import { NewsCard } from '@/components/public/news/NewsCard'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { cldPhoto } from '@/lib/cloudinary'
import { longDate } from '@/lib/dates'
import { getArticle, getRelated, newsCategoryLabel, type ArticleBlock } from '@/data/news.data'

export const NewsArticle: React.FC = () => {
  const { slug = '' } = useParams()
  const article = getArticle(slug)
  const [coverFailed, setCoverFailed] = useState(false)

  useDocumentTitle(article ? `${article.title} | Zoe Schools` : undefined)

  if (!article) return <NotFound />

  const cover = cldPhoto(article.cover, { width: 1600, ratio: '16:9' })
  const body: ArticleBlock[] = article.body ?? [{ type: 'p', text: article.excerpt }]
  const related = getRelated(article)

  return (
    <>
      <article>
        <header className="bg-cream pb-10 pt-28 lg:pb-14 lg:pt-36">
          <div className="mx-auto max-w-3xl px-6 md:px-10">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" /> Back to News
            </Link>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent">
                {newsCategoryLabel(article.category)}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-gray-600">
                {article.tag}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">{article.excerpt}</p>

            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                {article.author.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{article.author}</p>
                <p className="text-xs text-gray-500">
                  {longDate(article.date)} · {article.readTime} min read
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-6 pt-8 md:px-10">
          <div className="relative aspect-video overflow-hidden rounded-3xl bg-[#e6e1dc]">
            {cover && !coverFailed ? (
              <img
                src={cover}
                alt={article.title}
                onError={() => setCoverFailed(true)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400">
                <ImageIcon className="h-8 w-8" />
                <span className="text-xs">Story cover</span>
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-12 md:px-10 lg:py-16">
          <ContentBlocks blocks={body} />

          <div className="mt-12 flex flex-col gap-5 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <ShareButtons title={article.title} />
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> All stories
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-cream py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <SectionHeading title="More" highlight="Stories" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((a) => (
                <NewsCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default NewsArticle