import React from 'react'

interface SectionHeadingProps {
  /** Plain part, e.g. "Zoe in" */
  title: string
  /** Italic green part, e.g. "Motion" */
  highlight?: string
  subtitle?: string
  align?: 'center' | 'left'
  className?: string
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  highlight,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const centered = align === 'center'

  return (
    <div className={`${centered ? 'text-center' : 'text-left'} ${className}`}>
      <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
        {title}{' '}
        {highlight && <span className="italic text-[#02BB22]">{highlight}</span>}
      </h2>
      <div className={`mt-3 h-0.5 w-12 bg-[#02BB22] ${centered ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p
          className={`mt-4 max-w-4xl text-sm text-gray-600 sm:text-base ${centered ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeading