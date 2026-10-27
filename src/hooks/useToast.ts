import { useState, useCallback } from 'react'
import { ToastItem } from '@components/common/ToastContainer'

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback(
    (
      type: 'error' | 'success' | 'info' | 'warning',
      message: string,
      title?: string,
      duration?: number
    ) => {
      const id = Date.now().toString()
      const toast: ToastItem = { id, type, message, title, duration: duration || 5000 }
      setToasts((prev) => [...prev, toast])
      return id
    },
    []
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const success = useCallback(
    (message: string, title?: string) => addToast('success', message, title),
    [addToast]
  )

  const error = useCallback(
    (message: string, title?: string) => addToast('error', message, title),
    [addToast]
  )

  const info = useCallback(
    (message: string, title?: string) => addToast('info', message, title),
    [addToast]
  )

  const warning = useCallback(
    (message: string, title?: string) => addToast('warning', message, title),
    [addToast]
  )

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  }
}