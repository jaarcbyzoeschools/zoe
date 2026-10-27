import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarDays, CalendarPlus, Clock, MapPin } from 'lucide-react'
import { NotFound } from '@pages/errors'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ContentBlocks } from '@/components/common/ContentBlocks'
import { ShareButtons } from '@/components/common/ShareButtons'
import { EventCard } from '@/components/public/events/EventCard'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { googleCalendarUrl } from '@/lib/calendar'
import { cldPhoto } from '@/lib/cloudinary'
import { dateRangeLabel, dayOf, isPast, monthShort } from '@/lib/dates'
import { eventTimeLabel, getEvent, getUpcomingEvents } from '@/data/events.data'
import type { ArticleBlock } from '@/data/news.data'

export const EventDetail: React.FC = () => {
  const { id = '' } = useParams()
  const event = getEvent(id)

  useDocumentTitle(event ? `${event.title} | Zoe Schools` : undefined)

  if (!event) return <NotFound />

  const past = isPast(event.endDate ?? event.date)
  const cover = event.cover ? cldPhoto(event.cover, { width: 1400, ratio: '16:9' }) : ''
  const body: ArticleBlock[] = event.body ?? [{ type: 'p', text: event.summary }]
  const others = getUpcomingEvents().filter((e) => e.id !== event.id).slice(0, 2)

  const infoRow = 'flex items-start gap-3 text-sm'
  const iconBox =
    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent'

  return (
    <>
      <header className="bg-linear-to-br from-[#6e1212] via-[#7a1818] to-[#1B4D2B] pb-12 pt-28 text-white lg:pb-16 lg:pt-36">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-8 px-6 md:px-10">
          <div className="max-w-3xl">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back to calendar
            </Link>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium backdrop-blur-sm">
                {event.category}
              </span>
              {past && (
                <span className="rounded-full bg-black/30 px-3 py-1 text-[11px] font-medium">Past event</span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {event.title}
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-white/85 sm:text-lg">
              {event.summary}
            </p>
          </div>

          <div className="hidden h-28 w-24 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/25 bg-white/10 backdrop-blur-sm sm:flex">
            <span className="text-4xl font-bold leading-none">{dayOf(event.date)}</span>
            <span className="mt-2 text-xs font-medium tracking-widest">{monthShort(event.date)}</span>
          </div>
        </div>
      </header>

      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:px-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          {/* Info card: first on mobile, right column on desktop */}
          <aside className="lg:col-start-2 lg:row-start-1">
            <div className="rounded-2xl border border-gray-200 bg-cream p-5 lg:sticky lg:top-28">
              <h2 className="font-serif text-xl font-bold text-gray-900">Event details</h2>

              <div className="mt-5 space-y-4">
                <div className={infoRow}>
                  <span className={iconBox}><CalendarDays className="h-4 w-4" /></span>
                  <div>
                    <p className="font-semibold text-gray-900">Date</p>
                    <p className="text-gray-600">{dateRangeLabel(event.date, event.endDate)}</p>
                  </div>
                </div>
                <div className={infoRow}>
                  <span className={iconBox}><Clock className="h-4 w-4" /></span>
                  <div>
                    <p className="font-semibold text-gray-900">Time</p>
                    <p className="text-gray-600">{eventTimeLabel(event)}</p>
                  </div>
                </div>
                <div className={infoRow}>
                  <span className={iconBox}><MapPin className="h-4 w-4" /></span>
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
              </div>

              {past ? (
                <p className="mt-6 rounded-lg bg-gray-100 px-4 py-3 text-center text-sm text-gray-600">
                  This event has already taken place.
                </p>
              ) : (
                <a
                  href={googleCalendarUrl(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
                >
                  <CalendarPlus className="h-4 w-4" /> Add to Calendar
                </a>
              )}
            </div>
          </aside>

          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            {cover && <img src={cover} alt={event.title} className="mb-8 w-full rounded-3xl" />}
            <ContentBlocks blocks={body} />

            <div className="mt-12 flex flex-col gap-5 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <ShareButtons title={event.title} />
              <Link to="/events" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
                <ArrowLeft className="h-4 w-4" /> All events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="bg-cream py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading align="left" title="More Upcoming" highlight="Events" />
              <Link
                to="/events"
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:border-accent/50 hover:bg-accent/5"
              >
                View Full Calendar <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:gap-5">
              {others.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default EventDetail