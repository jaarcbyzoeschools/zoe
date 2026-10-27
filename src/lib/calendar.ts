import { addDays, format, parseISO } from 'date-fns'
import type { SchoolEvent } from '@/data/events.data'

export const googleCalendarUrl = (event: SchoolEvent) => {
  const first = event.date
  const last = event.endDate ?? event.date
  const stamp = (d: string, t: string) => `${d.replace(/-/g, '')}T${t.replace(':', '')}00`

  const dates =
    event.allDay || !event.startTime
      ? // All-day events end on the day after (exclusive)
        `${format(parseISO(first), 'yyyyMMdd')}/${format(addDays(parseISO(last), 1), 'yyyyMMdd')}`
      : `${stamp(first, event.startTime)}/${stamp(last, event.endTime ?? event.startTime)}`

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates,
    details: `${event.summary}\n\n${window.location.origin}/events/${event.id}`,
    location: event.location,
    ctz: 'Africa/Lagos',
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}