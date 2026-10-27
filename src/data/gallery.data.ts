import type { PhotoShape } from '@/lib/cloudinary'

export type PhotoCategory =
  | 'classrooms'
  | 'ict-robotics'
  | 'sports'
  | 'excursions'
  | 'cultural-day'
  | 'graduation'
  | 'campuses'

export interface GalleryPhoto {
  id: string
  /** Paste the Cloudinary link here. Leave '' to show a placeholder tile. */
  src: string
  title: string
  category: PhotoCategory
  shape: PhotoShape
}

export const PHOTO_CATEGORIES: { id: 'all' | PhotoCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'classrooms', label: 'Classrooms' },
  { id: 'ict-robotics', label: 'ICT & Robotics' },
  { id: 'sports', label: 'Sports' },
  { id: 'excursions', label: 'Excursions' },
  { id: 'cultural-day', label: 'Cultural Day' },
  { id: 'graduation', label: 'Graduation' },
  { id: 'campuses', label: 'Campuses' },
]

export const categoryLabel = (id: PhotoCategory) =>
  PHOTO_CATEGORIES.find((c) => c.id === id)?.label ?? id

export const photos: GalleryPhoto[] = [
  { id: 'p1', src: '', title: 'Classroom Learning', category: 'classrooms', shape: 'portrait' },
  { id: 'p2', src: '', title: 'Robotics Club Session', category: 'ict-robotics', shape: 'landscape' },
  { id: 'p3', src: '', title: 'Inter-House Sports Day', category: 'sports', shape: 'portrait' },
  { id: 'p4', src: '', title: 'Morning Assembly', category: 'campuses', shape: 'landscape' },
  { id: 'p5', src: '', title: '2025 Graduation Ceremony', category: 'graduation', shape: 'portrait' },
  { id: 'p6', src: '', title: 'Cultural Day Parade', category: 'cultural-day', shape: 'portrait' },
  { id: 'p7', src: '', title: 'Science Excursion', category: 'excursions', shape: 'landscape' },
  { id: 'p8', src: '', title: 'Coding Lab', category: 'ict-robotics', shape: 'square' },
  { id: 'p9', src: '', title: 'Football Match', category: 'sports', shape: 'landscape' },
  { id: 'p10', src: '', title: 'Citadel of Peace', category: 'campuses', shape: 'portrait' },
  { id: 'p11', src: '', title: 'Prize-Giving Day', category: 'graduation', shape: 'landscape' },
  { id: 'p12', src: '', title: 'Traditional Attire Showcase', category: 'cultural-day', shape: 'portrait' },
  { id: 'p13', src: '', title: 'Library Visit', category: 'excursions', shape: 'square' },
  { id: 'p14', src: '', title: 'Mathematics Class', category: 'classrooms', shape: 'landscape' },
  { id: 'p15', src: '', title: 'Citadel of Joy', category: 'campuses', shape: 'landscape' },
]

export interface GalleryVideo {
  id: string
  /** Paste the Cloudinary video link here. Leave '' for a placeholder. */
  src: string
  title: string
  /** Small pill on the featured video, e.g. "Graduation 2025" */
  tag?: string
  location?: string
  /** Display text, e.g. '12:48' */
  duration: string
  featured?: boolean
}

export const videos: GalleryVideo[] = [
  {
    id: 'v1',
    src: '',
    title: 'Class of 2025 — Graduation & Prize-Giving Day',
    tag: 'Graduation 2025',
    location: 'Citadel of Peace, Isale General',
    duration: '12:48',
    featured: true,
  },
  { id: 'v2', src: '', title: 'Inter-House Sports 2026', duration: '06:12' },
  { id: 'v3', src: '', title: 'Robotics & Coding Fair', duration: '04:35' },
  { id: 'v4', src: '', title: 'Cultural Day Highlights', duration: '08:02' },
]