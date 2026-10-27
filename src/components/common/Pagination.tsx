import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

/** 1 2 3 … 8 style list */
const getPages = (page: number, total: number): (number | 'gap')[] => {
  const set = new Set<number>([1, total, page - 1, page, page + 1])
  if (page <= 3) {
    set.add(2)
    set.add(3)
  }
  if (page >= total - 2) {
    set.add(total - 1)
    set.add(total - 2)
  }
  const sorted = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
  const out: (number | 'gap')[] = []
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1] > 1) out.push('gap')
    out.push(n)
  })
  return out
}

const base =
  'flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-1.5">
      <button
        type="button"
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className={`${base} border-gray-200 bg-white text-gray-700 hover:border-accent/50 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {getPages(page, totalPages).map((item, i) =>
        item === 'gap' ? (
          <span key={`gap-${i}`} className="px-1 text-gray-400">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`Page ${item}`}
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onChange(item)}
            className={`${base} ${
              item === page
                ? 'border-accent bg-accent text-white'
                : 'border-gray-200 bg-white text-gray-700 hover:border-accent/50'
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className={`${base} border-gray-200 bg-white text-gray-700 hover:border-accent/50 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}

export default Pagination