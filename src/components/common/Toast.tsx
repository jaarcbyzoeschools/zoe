import React, { useEffect } from 'react'
import { Alert } from './Alert'

interface ToastProps {
  id: string
  type: 'error' | 'success' | 'info' | 'warning'
  message: string
  title?: string
  duration?: number
  onClose: (id: string) => void
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  message,
  title,
  duration = 5000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration)
    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  return (
    <div className="mb-2 animate-slide-in">
      <Alert
        type={type}
        title={title}
        message={message}
        onClose={() => onClose(id)}
        dismissible
      />
    </div>
  )
}