import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, MapPin, Phone } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { campuses } from '@/data/campuses.data'
import { directionsUrl, telHref } from '@/data/contact.data'

const NUMBER_WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']

export const CampusGrid: React.FC = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className="mx-auto max-w-6xl px-6 md:px-10">
      <SectionHeading
        title="Find a Campus"
        highlight="Near You"
        subtitle={`${NUMBER_WORDS[campuses.length] ?? campuses.length} campuses across Ogbomoso — the same standard of excellence at each one.`}
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {campuses.map((campus, i) => (
          <motion.article
            key={campus.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.07, ease: 'easeOut' }}
            className="flex flex-col rounded-2xl border border-gray-200 bg-cream p-5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Building2 className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold text-gray-900">{campus.name}</h3>

            <div className="mt-3 space-y-2 text-xs text-gray-600">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {campus.address}
              </p>
              <a
                href={telHref(campus.phone)}
                className="flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" /> {campus.phone}
              </a>
            </div>

            <a
              href={directionsUrl(`Zoe Schools ${campus.name}, ${campus.address}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-medium text-accent hover:underline"
            >
              Get directions <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
)

export default CampusGrid