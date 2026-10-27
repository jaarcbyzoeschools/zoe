import React from 'react'
import { ArrowRight, Building2, CalendarCheck, MapPin } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { CONTACT, directionsUrl } from '@/data/contact.data'

const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  'Hello Zoe Schools, I would like to ask about admission.',
)}`

export const ContactAside: React.FC<{ onBookTour: () => void }> = ({ onBookTour }) => (
  <div className="flex flex-col gap-4">
    {/* Map */}
    <div className="relative min-h-72 flex-1 overflow-hidden rounded-3xl bg-[#e3eadf]">
      {CONTACT.mapEmbedUrl ? (
        <iframe
          src={CONTACT.mapEmbedUrl}
          title="Map showing the Zoe Schools head office"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
            <MapPin className="h-5 w-5" />
          </span>
          <a
            href={directionsUrl(`Zoe Schools ${CONTACT.headOffice.name}, ${CONTACT.headOffice.address}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-accent hover:underline"
          >
            Open in Google Maps
          </a>
        </div>
      )}

      <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Building2 className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-semibold text-gray-900">{CONTACT.headOffice.name}</p>
          <p className="text-[11px] text-gray-500">{CONTACT.headOffice.address}</p>
        </div>
      </div>
    </div>

    {/* WhatsApp */}
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-2xl bg-[#0f5a2e] p-4 text-white transition-colors hover:bg-[#0c4b26] sm:p-5"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0f5a2e]">
        <FaWhatsapp className="h-6 w-6" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">Chat with Admissions</p>
        <p className="text-xs text-white/80">Quick answers on WhatsApp, Mon-Sat</p>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
    </a>

    {/* School tour */}
    <button
      type="button"
      onClick={onBookTour}
      className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md sm:p-5"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
        <CalendarCheck className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-900">Book a School Tour</p>
        <p className="text-xs text-gray-600">
          See our classrooms, ICT lab and boarding facilities
        </p>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
    </button>
  </div>
)

export default ContactAside