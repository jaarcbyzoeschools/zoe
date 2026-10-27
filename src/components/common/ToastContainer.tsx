import React from 'react'
import { Toast } from './Toast'

export interface ToastItem {
  id: string
  type: 'error' | 'success' | 'info' | 'warning'
  message: string
  title?: string
  duration?: number
}

interface ToastContainerProps {
  toasts: ToastItem[]
  onRemoveToast: (id: string) => void
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemoveToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          title={toast.title}
          duration={toast.duration}
          onClose={onRemoveToast}
        />
      ))}
    </div>
  )
}