export interface FaqItem {
  id: string
  question: string
  answer: string
}

// Only the first answer comes from the design. The rest are placeholders: please correct them.
export const faqs: FaqItem[] = [
  {
    id: 'requirements',
    question: 'What are the entry requirements?',
    answer:
      'A completed application form, birth certificate, two passport photographs and the last school report (where applicable).',
  },
  {
    id: 'entrance-exam',
    question: 'Is there an entrance examination?',
    answer:
      'Yes. Prospective pupils sit a short entrance assessment so we can place them in the right class. Dates are listed on our events calendar.',
  },
  {
    id: 'decision-time',
    question: 'How long does it take to get an admission decision?',
    answer:
      'Most families hear from us within a few working days after the entrance assessment.',
  },
  {
    id: 'school-bus',
    question: 'Do you offer school bus services?',
    answer:
      'School bus services are available on selected routes. Please ask the admissions office about routes and fees for your area.',
  },
  {
    id: 'mid-term',
    question: 'Can my child join mid-term?',
    answer:
      'Yes, subject to available space and a successful assessment. Contact the admissions office and we will guide you through the process.',
  },
]