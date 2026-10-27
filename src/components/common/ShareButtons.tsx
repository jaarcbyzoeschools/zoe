import React, { useState } from 'react'
import { Check, Link2 } from 'lucide-react'
import { FaFacebookF, FaWhatsapp, FaXTwitter } from 'react-icons/fa6'

export const ShareButtons: React.FC<{ title: string }> = ({ title }) => {
  const [copied, setCopied] = useState(false)
  const url = window.location.href
  const enc = encodeURIComponent

  const links = [
    { label: 'Share on WhatsApp', href: `https://wa.me/?text=${enc(`${title} ${url}`)}`, icon: <FaWhatsapp /> },
    { label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, icon: <FaFacebookF /> },
    { label: 'Share on X', href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`, icon: <FaXTwitter /> },
  ]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked: nothing to do */
    }
  }

  const btn =
    'flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm font-medium text-gray-500">Share</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} className={btn}>
          {l.icon}
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" className={btn}>
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  )
}

export default ShareButtons