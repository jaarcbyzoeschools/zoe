// Placeholders: replace with the real details.
export const CONTACT = {
  phones: ['+234 800 000 0000', '+234 800 000 0001'],
  emails: ['info@zoeschools.ng', 'admissions@zoeschools.ng'],
  headOffice: {
    name: 'Citadel of Peace (Head Office)',
    address: 'Isale General, Ogbomoso',
    lines: ['Citadel of Peace,', 'Isale General, Ogbomoso'],
  },
  hours: ['Mon - Fri: 7:30 AM - 4:00 PM', 'Sat: 9:00 AM - 1:00 PM'],
  /** International format, digits only (no + or spaces) */
  whatsapp: '2348000000000',
  /** Google Maps > Share > Embed a map > copy the src="..." link from the code */
  mapEmbedUrl: '',
}

export const SUBJECTS = [
  'Admission enquiry',
  'School tour request',
  'Fees & payments',
  'Careers',
  'General enquiry',
]

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`

export const directionsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`