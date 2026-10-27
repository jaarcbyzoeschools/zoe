export interface ContactPayload {
  fullName: string
  email: string
  phone: string
  campus: string
  subject: string
  message: string
}

export async function sendContactMessage(payload: ContactPayload): Promise<void> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined
  if (!accessKey) {
    throw new Error('The contact form is not set up yet. Please call or email us instead.')
  }

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `[Zoe Schools website] ${payload.subject}`,
      from_name: 'Zoe Schools Website',
      name: payload.fullName,
      email: payload.email, // used as the reply-to address
      phone: payload.phone || 'Not provided',
      preferred_campus: payload.campus || 'No preference',
      message: payload.message,
    }),
  })

  const data = await res.json().catch(() => null)

  if (!res.ok || !data?.success) {
    throw new Error(
      data?.message || 'We could not send your message. Please try again or call us directly.',
    )
  }
}