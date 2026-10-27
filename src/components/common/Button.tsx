import React from 'react'
import { classNameBuilder } from '@utils/index'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      icon,
      iconPosition = 'left',
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'font-medium rounded-md transition-colors duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variantClasses = {
      primary: 'bg-primary text-white hover:bg-blue-700 focus:ring-primary disabled:bg-gray-300',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-gray-100',
      danger: 'bg-danger text-white hover:bg-red-600 focus:ring-danger disabled:bg-gray-300',
      success: 'bg-success text-white hover:bg-green-600 focus:ring-success disabled:bg-gray-300',
    }

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={classNameBuilder(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          (disabled || isLoading) && 'opacity-60 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'