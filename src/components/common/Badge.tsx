import React from 'react'
import { classNameBuilder } from '@utils/index'

interface BadgeProps {
  label: string
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'sm',
  className,
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-primary',
    success: 'bg-green-100 text-success',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-danger',
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={classNameBuilder(
        'inline-block font-medium rounded-full',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {label}
    </span>
  )
}