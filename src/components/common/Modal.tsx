import React from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

interface ModalProps {
  isOpen: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
  onConfirm?: () => void | Promise<void>
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
  size = 'md',
}) => {
  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg shadow-lg ${sizeClasses[size]} w-full mx-4`}>
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto">{children}</div>

        <div className="flex gap-3 border-t border-gray-200 p-4 justify-end">
          <Button variant="secondary" onClick={onClose} disabled={isLoading} size="sm">
            {cancelText}
          </Button>
          {onConfirm && (
            <Button variant="primary" onClick={onConfirm} isLoading={isLoading} size="sm">
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}