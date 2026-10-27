import { usePaymentStore } from '@store/paymentStore'

export const usePayment = () => {
  const {
    payments,
    currentPayment,
    initializePaymentResponse,
    isLoading,
    error,
    initializePayment,
    getPaymentStatus,
    fetchStudentPayments,
    clearPayment,
  } = usePaymentStore()

  return {
    payments,
    currentPayment,
    initializePaymentResponse,
    isLoading,
    error,
    initializePayment,
    getPaymentStatus,
    fetchStudentPayments,
    clearPayment,
  }
}