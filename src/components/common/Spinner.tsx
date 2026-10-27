import React from 'react'
import { classNameBuilder } from '@utils/index'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
  fullScreen?: boolean
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  message,
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={classNameBuilder(
          'border-4 border-gray-200 border-t-primary rounded-full animate-spin',
          sizeClasses[size]
        )}
      ></div>
      {message && <p className="text-xs text-gray-600">{message}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return spinner
}