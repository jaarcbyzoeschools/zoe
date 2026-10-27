

import React, { useState } from 'react'
import { Phone } from 'lucide-react'
import { PageHero } from '@/components/common/PageHero'
import { FaqSection } from '@/components/common/FaqSection'

import { ContactInfoCards } from '@/components/public/contact/ContactInfoCards'
import { ContactForm, type SubjectRequest } from '@/components/public/contact/ContactForm'
import { ContactAside } from '@/components/public/contact/ContactAside'
import { CampusGrid } from '@/components/public/contact/CampusGrid'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export const Contact: React.FC = () => {
  useDocumentTitle('Contact Us | Zoe Schools')
  const [subjectRequest, setSubjectRequest] = useState<SubjectRequest | null>(null)

  const bookTour = () => {
    setSubjectRequest({ subject: 'School tour request', nonce: Date.now() })
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <>
      {/* Swap for your own hero if you've already built one */}
      <PageHero
  badge="Contact"
  badgeIcon={<Phone />}
  title="We’d Love to "
  highlight="Hear From You "
  subtitle="Questions about admission, fees, transport or boarding? Reach our admissions team or visit any of our 8 campuses."
/>

      <section className="bg-cream pb-16 lg:pb-24">
        <div className="mx-auto max-w-6xl space-y-6 px-6 md:px-10 lg:space-y-8">
          <ContactInfoCards />

          <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
            <div id="contact-form" className="scroll-mt-28 rounded-3xl bg-white p-6 shadow-md sm:p-8">
              <ContactForm subjectRequest={subjectRequest} />
            </div>
            <ContactAside onBookTour={bookTour} />
          </div>
        </div>
      </section>

      <CampusGrid />
      <FaqSection />
    </>
  )
}

export default Contact