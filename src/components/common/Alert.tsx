import React from 'react'
import { AlertCircle, CheckCircle, InfoIcon, AlertTriangle, X } from 'lucide-react'
import { classNameBuilder } from '@utils/index'

interface AlertProps {
  type: 'error' | 'success' | 'info' | 'warning'
  title?: string
  message: string
  onClose?: () => void
  dismissible?: boolean
   className?: string
}

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
  dismissible = true,
  className
}) => {
  const typeConfig = {
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      titleColor: 'text-red-900',
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      titleColor: 'text-green-900',
    },
    info: {
      icon: InfoIcon,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      titleColor: 'text-blue-900',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      titleColor: 'text-yellow-900',
    },
  }

  const config = typeConfig[type]
  const IconComponent = config.icon

  return (
    <div
      className={classNameBuilder(
        'flex gap-3 rounded-md border p-3 text-sm',
        config.bgColor,
        config.borderColor,
        config.textColor,
        className
      )}
      role="alert"
    >
      <IconComponent className="w-4 h-4 flex-shrink-0 mt-0.5" />

      <div className="flex-1">
        {title && <h3 className={classNameBuilder('font-medium mb-0.5', config.titleColor)}>{title}</h3>}
        <p>{message}</p>
      </div>

      {dismissible && onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Close alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}