import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@components/common/Button'
import { ROUTES } from '@constants/index'

export const ServerError: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="bg-yellow-100 rounded-full p-4">
            <AlertTriangle className="w-12 h-12 text-warning" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">500</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Server Error</h2>

        <p className="text-sm text-gray-600 mb-6">
          Something went wrong on our end. Our team has been notified and is working to fix
          it. Please try again later.
        </p>

        <div className="flex flex-col gap-3">
          <Button variant="primary" onClick={() => window.location.reload()} fullWidth>
            Refresh Page
          </Button>
          <Button variant="secondary" onClick={() => navigate(ROUTES.DASHBOARD)} fullWidth>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}