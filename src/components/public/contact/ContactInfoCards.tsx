import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import { CONTACT, telHref } from '@/data/contact.data'

interface InfoCard {
  icon: LucideIcon
  title: string
  lines: { text: string; href?: string }[]
}

const cards: InfoCard[] = [
  { icon: Phone, title: 'Call Us', lines: CONTACT.phones.map((p) => ({ text: p, href: telHref(p) })) },
  { icon: Mail, title: 'Email Us', lines: CONTACT.emails.map((e) => ({ text: e, href: `mailto:${e}` })) },
  { icon: MapPin, title: 'Head Office', lines: CONTACT.headOffice.lines.map((text) => ({ text })) },
  { icon: Clock, title: 'Office Hours', lines: CONTACT.hours.map((text) => ({ text })) },
]

export const ContactInfoCards: React.FC = () => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {cards.map(({ icon: Icon, title, lines }, i) => (
      <motion.div
        key={title}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="mt-4 text-sm font-semibold text-gray-900">{title}</h3>
        <div className="mt-2 space-y-1.5 text-xs text-gray-600">
          {lines.map(({ text, href }) =>
            href ? (
              <a
                key={text}
                href={href}
                className="block break-words transition-colors hover:text-accent"
              >
                {text}
              </a>
            ) : (
              <p key={text}>{text}</p>
            ),
          )}
        </div>
      </motion.div>
    ))}
  </div>
)

export default ContactInfoCards