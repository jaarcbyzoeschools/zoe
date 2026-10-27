const UPLOAD_MARKER = '/upload/'

const RATIOS = {
  portrait: '4:5',
  landscape: '4:3',
  square: '1:1',
} as const

export type PhotoShape = keyof typeof RATIOS

export const shapeToCssRatio = (shape: PhotoShape) => RATIOS[shape].replace(':', ' / ')

/** Inserts Cloudinary transformations into a normal delivery link. */
const withTransform = (src: string, transform: string) =>
  src.includes(UPLOAD_MARKER)
    ? src.replace(UPLOAD_MARKER, `${UPLOAD_MARKER}${transform}/`)
    : src

/** Optimised, cropped photo (WebP/AVIF automatically). Returns '' when there is no link yet. */
export const cldPhoto = (
  src: string,
  opts: { width: number; shape?: PhotoShape; ratio?: string },
) => {
  if (!src) return ''
  const parts = ['f_auto', 'q_auto', `w_${opts.width}`]
  const ratio = opts.ratio ?? (opts.shape ? RATIOS[opts.shape] : undefined)
  if (ratio) parts.push(`ar_${ratio}`, 'c_fill', 'g_auto')
  else parts.push('c_limit')
  return withTransform(src, parts.join(','))
}

/** Poster frame taken from a Cloudinary video (used later for video cards). */
export const cldVideoPoster = (src: string, width = 800) => {
  if (!src) return ''
  const jpg = src.replace(/\.[a-z0-9]+$/i, '.jpg')
  return withTransform(jpg, `f_auto,q_auto,w_${width},so_2`)
}

/** Optimised video stream link. Returns '' when there is no link yet. */
export const cldVideo = (src: string) => (src ? withTransform(src, 'f_auto,q_auto') : '')