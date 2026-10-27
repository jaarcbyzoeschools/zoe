import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { Button } from '@components/common/Button'
import { ROUTES } from '@constants/index'

export const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="bg-red-100 rounded-full p-4">
            <AlertCircle className="w-12 h-12 text-danger" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Page Not Found</h2>

        <p className="text-sm text-gray-600 mb-6">
          Sorry, the page you're looking for doesn't exist. It might have been moved or
          deleted.
        </p>

        <div className="flex flex-col gap-3">
          <Button variant="primary" onClick={() => navigate(ROUTES.DASHBOARD)} fullWidth>
            Go to Dashboard
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)} fullWidth>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}