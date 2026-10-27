import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, MapPin } from 'lucide-react'
import { dayOf, isPast, monthShort } from '@/lib/dates'
import { eventTimeLabel, type SchoolEvent } from '@/data/events.data'

export const EventCard: React.FC<{ event: SchoolEvent }> = ({ event }) => {
  const past = isPast(event.endDate ?? event.date)

  return (
    <article
      className={`group relative flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent ${
        past ? 'opacity-70' : ''
      }`}
    >
      <div className="flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-linear-to-br from-[#6e1212] via-[#7a1818] to-[#1B4D2B] text-white">
        <span className="text-xl font-bold leading-none">{dayOf(event.date)}</span>
        <span className="mt-1 text-[10px] font-medium tracking-wider">{monthShort(event.date)}</span>
      </div>

      <div className="min-w-0 flex-1">
        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
          {event.category}
        </span>
        <h3 className="mt-1.5 text-sm font-semibold text-gray-900 sm:text-base">
          {/* after:absolute makes the entire card the click target */}
          <Link
            to={`/events/${event.id}`}
            className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent focus:outline-none"
          >
            {event.title}
          </Link>
        </h3>
        <div className="mt-1.5 space-y-1 text-xs text-gray-500">
          <p className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 shrink-0" /> {eventTimeLabel(event)}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" /> {event.location}
          </p>
        </div>
      </div>

      {past ? (
        <span className="shrink-0 text-[11px] font-medium text-gray-500">Past</span>
      ) : (
        <span
          aria-hidden
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent transition-colors group-hover:bg-accent group-hover:text-white"
        >
          <ArrowRight className="h-4 w-4" />
        </span>
      )}
    </article>
  )
}

export default EventCard