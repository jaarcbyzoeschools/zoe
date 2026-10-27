import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { faqs, type FaqItem } from '@/data/faq.data'

interface FaqSectionProps {
  items?: FaqItem[]
  title?: string
  highlight?: string
  className?: string
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  items = faqs,
  title = 'Frequently Asked',
  highlight = 'Questions',
  className = '',
}) => {
  // One answer open at a time, first one open by default
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <section className={`bg-cream py-16 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <SectionHeading title={title} highlight={highlight} />

        <div className="mt-10 space-y-3">
          {items.map((item) => {
            const open = item.id === openId
            return (
              <div key={item.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${item.id}`}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => setOpenId(open ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-gray-900 transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:text-base"
                  >
                    {item.question}
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-300 ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FaqSection