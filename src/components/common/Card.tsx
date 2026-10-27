import React from 'react'
import { classNameBuilder } from '@utils/index'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'elevated' | 'bordered'
  clickable?: boolean
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  variant = 'default',
  clickable = false,
  onClick,
}) => {
  const paddingClasses = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  }

  const variantClasses = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
    bordered: 'bg-white border-2 border-primary',
  }

  return (
    <div
      onClick={onClick}
      className={classNameBuilder(
        'rounded-lg transition-all duration-200',
        paddingClasses[padding],
        variantClasses[variant],
        clickable && 'cursor-pointer hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  )
}