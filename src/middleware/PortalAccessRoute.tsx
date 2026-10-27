import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { dashboardService } from '@services/dashboard'
import { ROUTES } from '@constants/index'
import { logger } from '@utils/logger'

interface PortalAccessRouteProps {
  children: React.ReactNode
  studentId: string
  requiresFirstPayment?: boolean
  requiresSecondPayment?: boolean
  sessionYear: number
  term: number
}

export const PortalAccessRoute: React.FC<PortalAccessRouteProps> = ({
  children,
  studentId,
  requiresFirstPayment = false,
  requiresSecondPayment = false,
  sessionYear,
  term,
}) => {
  const [accessAllowed, setAccessAllowed] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await dashboardService.getAccessStatus(studentId, sessionYear, term)

        if (!response.success) {
          logger.error('Failed to check access status')
          setAccessAllowed(false)
          setIsLoading(false)
          return
        }

        const { portalLocked, gradesLocked } = response.data!

        if (requiresFirstPayment && portalLocked) {
          setAccessAllowed(false)
        } else if (requiresSecondPayment && gradesLocked) {
          setAccessAllowed(false)
        } else {
          setAccessAllowed(true)
        }

        setIsLoading(false)
      } catch (error) {
        logger.error('Error checking portal access:', error)
        setAccessAllowed(false)
        setIsLoading(false)
      }
    }

    checkAccess()
  }, [studentId, sessionYear, term, requiresFirstPayment, requiresSecondPayment])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Checking access...</p>
        </div>
      </div>
    )
  }

  if (!accessAllowed) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <>{children}</>
}