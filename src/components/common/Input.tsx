import React from 'react'
import { classNameBuilder } from '@utils/index'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      iconPosition = 'left',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            {label}
            {props.required && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            disabled={disabled}
            className={classNameBuilder(
              'w-full px-3 py-2 text-sm border rounded-md transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              icon && iconPosition === 'left' && 'pl-9',
              icon && iconPosition === 'right' && 'pr-9',
              error
                ? 'border-danger text-danger focus:ring-danger focus:border-danger'
                : 'border-gray-300 focus:ring-primary focus:border-primary',
              disabled && 'bg-gray-100 cursor-not-allowed opacity-60',
              className
            )}
            {...props}
          />

          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
        </div>

        {error && <p className="text-xs text-danger mt-1">{error}</p>}
        {helperText && !error && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'