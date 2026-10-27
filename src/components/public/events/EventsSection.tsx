import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { getUpcomingEvents } from '@/data/events.data'
import { EventCard } from './EventCard'


export const EventsSection: React.FC<{ className?: string; limit?: number }> = ({
  className = '',
  limit = 4,
}) => {
  const upcoming = getUpcomingEvents().slice(0, limit)

  return (
    <section className={className}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          align="left"
          title="Upcoming"
          highlight="Events"
          subtitle="Mark your calendar — parents and guardians are welcome."
        />
        <Link
          to="/events"
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:border-accent/50 hover:bg-accent/5"
        >
          View Full Calendar <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {upcoming.length > 0 ? (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:gap-5">
          {upcoming.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white py-10 text-center text-sm text-gray-500">
          No upcoming events right now. Check back soon.
        </p>
      )}
    </section>
  )
}

export default EventsSection