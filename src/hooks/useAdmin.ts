import { useAdminStore } from '@store/adminStore'
import { useEffect } from 'react'

export const useAdmin = () => {
  const {
    applications,
    selectedApplication,
    stats,
    isLoading,
    error,
    filterStatus,
    filterClassLevel,
    fetchApplications,
    fetchApplication,
    approveApplication,
    rejectApplication,
    fetchStats,
    setFilterStatus,
    setFilterClassLevel,
    clearAdmin,
  } = useAdminStore()

  useEffect(() => {
    fetchApplications(filterStatus ?? undefined, filterClassLevel ?? undefined)
    fetchStats()
  }, [filterStatus, filterClassLevel])

  return {
    applications,
    selectedApplication,
    stats,
    isLoading,
    error,
    filterStatus,
    filterClassLevel,
    fetchApplication,
    approveApplication,
    rejectApplication,
    setFilterStatus,
    setFilterClassLevel,
    clearAdmin,
  }
}