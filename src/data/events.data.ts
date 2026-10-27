import { formatTime, isPast } from '@/lib/dates'
import type { ArticleBlock } from '@/data/news.data'

export type EventCategory = 'Calendar' | 'Admission' | 'Sports' | 'Celebration' | 'Academics'

export interface SchoolEvent {
  id: string
  title: string
  date: string
  endDate?: string
  allDay?: boolean
  startTime?: string
  endTime?: string
  location: string
  category: EventCategory
  summary: string
  cover?: string
  body?: ArticleBlock[]
}

// Placeholder content: replace with the real school calendar.
export const events: SchoolEvent[] = [
  {
    id: 'first-term-resumption',
    title: 'First Term Resumption',
    date: '2026-09-14',
    allDay: true,
    location: 'All campuses',
    category: 'Calendar',
    summary: 'Pupils and students resume for the new term across all campuses.',
  },
  {
    id: 'parents-teachers-meeting',
    title: 'Parents–Teachers Meeting',
    date: '2026-10-17',
    startTime: '10:00',
    endTime: '12:00',
    location: 'All campuses',
    category: 'Calendar',
    summary: 'Meet your child’s teachers to discuss progress, goals and any concerns.',
  },
  {
    id: 'mid-term-break',
    title: 'Mid-Term Break Begins',
    date: '2026-10-31',
    allDay: true,
    location: 'All campuses',
    category: 'Calendar',
    summary: 'Classes pause for the mid-term break. Lessons resume on the date in the school calendar.',
  },
  {
    id: 'open-day',
    title: 'Open Day & School Tour',
    date: '2026-11-07',
    startTime: '10:00',
    endTime: '14:00',
    location: 'Citadel of Joy, Orogun',
    category: 'Admission',
    summary: 'Tour the campus, meet our teachers and learn how admission works for 2026/2027.',
    body: [
      { type: 'p', text: 'Placeholder: parents and prospective pupils are invited to see Zoe Schools first-hand. Walk through the classrooms, ICT lab and play areas, and speak directly with our teachers and admissions team.' },
      { type: 'h2', text: 'What to expect' },
      { type: 'p', text: 'Placeholder: a guided tour, a short presentation on our curriculum, and time for your questions. Light refreshments will be available.' },
      { type: 'h2', text: 'What to bring' },
      { type: 'p', text: 'Placeholder: your child’s most recent report card (if available) and any questions you would like answered.' },
    ],
  },
  {
    id: 'entrance-exam',
    title: 'Entrance Examination',
    date: '2026-11-14',
    startTime: '09:00',
    endTime: '12:00',
    location: 'Citadel of Peace, Isale General',
    category: 'Admission',
    summary: 'Entrance examination for prospective pupils applying for the 2026/2027 session.',
  },
  {
    id: 'inter-house-sports',
    title: 'Inter-House Sports Competition',
    date: '2026-11-21',
    startTime: '08:00',
    endTime: '16:00',
    location: 'Citadel of Glory 1, Mooro',
    category: 'Sports',
    summary: 'A full day of track and field events, team games and house pride.',
    body: [
      { type: 'p', text: 'Placeholder: the four houses compete in track and field events, relays and team games. Parents and guardians are welcome to cheer from the stands.' },
      { type: 'h2', text: 'Programme' },
      { type: 'p', text: 'Placeholder: march-past and opening at 8:00 AM, track events through the morning, team games after lunch, and prize presentation at the close of the day.' },
    ],
  },
  {
    id: 'term-exams',
    title: 'First Term Examinations',
    date: '2026-11-30',
    endDate: '2026-12-04',
    allDay: true,
    location: 'All campuses',
    category: 'Academics',
    summary: 'First term examinations run for the week across all campuses.',
  },
  {
    id: 'carol-prize-giving',
    title: 'Christmas Carol & Prize-Giving Day',
    date: '2026-12-12',
    startTime: '16:00',
    endTime: '19:00',
    location: 'Citadel of Peace, Isale General',
    category: 'Celebration',
    summary: 'An evening of carols, performances and awards for outstanding pupils.',
    body: [
      { type: 'p', text: 'Placeholder: join us to celebrate the term with carols, drama and music from our pupils, followed by the presentation of prizes for academic and character excellence.' },
    ],
  },
  {
    id: 'christmas-break',
    title: 'Christmas Break Begins',
    date: '2026-12-18',
    allDay: true,
    location: 'All campuses',
    category: 'Calendar',
    summary: 'Schools close for the Christmas holiday.',
  },
]

const lastDay = (e: SchoolEvent) => e.endDate ?? e.date

export const getEvent = (id: string) => events.find((e) => e.id === id)

/** Upcoming first-to-last. Past events drop off automatically. */
export const getUpcomingEvents = () =>
  events.filter((e) => !isPast(lastDay(e))).sort((a, b) => a.date.localeCompare(b.date))

/** Most recent first. */
export const getPastEvents = () =>
  events.filter((e) => isPast(lastDay(e))).sort((a, b) => b.date.localeCompare(a.date))

/** 'All day', '10:00 AM - 2:00 PM' or '4:00 PM' */
export const eventTimeLabel = (e: SchoolEvent) => {
  if (e.allDay || !e.startTime) return 'All day'
  return e.endTime ? `${formatTime(e.startTime)} - ${formatTime(e.endTime)}` : formatTime(e.startTime)
}