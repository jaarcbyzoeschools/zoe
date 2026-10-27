import { useAuthStore } from '@store/authStore'
import { useEffect } from 'react'

export const useAuth = () => {
  const {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    changePassword,
    requestPasswordReset,
    resetPassword,
    initializeAuth,
  } = useAuthStore()

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    changePassword,
    requestPasswordReset,
    resetPassword,
  }
}