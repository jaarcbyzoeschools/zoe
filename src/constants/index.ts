export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const TIMEOUT = 30000

export const SESSION_TIMEOUT = 7 * 24 * 60 * 60 * 1000

export const SESSION_WARNING_TIME = 1 * 60 * 1000

export const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin',
  ADMISSIONS: 'admissions',
  BURSAR: 'bursar',
} as const

export const APPLICATION_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  ADMITTED: 'admitted',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn',
} as const

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const

export const STUDENT_STATUS = {
  ACTIVE: 'active',
  GRADUATED: 'graduated',
  WITHDRAWN: 'withdrawn',
  SUSPENDED: 'suspended',
} as const

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Your session has expired. Please login again.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_NOT_FOUND: 'User account not found.',
  PORTAL_LOCKED: 'Portal is locked. Please make the first payment to unlock.',
  GRADES_LOCKED: 'Grades are locked. Please make the second payment to view grades.',
} as const

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  PASSWORD_RESET_SENT: 'Password reset link sent to your email',
  PASSWORD_RESET_SUCCESS: 'Password reset successful',
  PAYMENT_INITIALIZED: 'Payment initialized successfully',
  APPLICATION_SUBMITTED: 'Application submitted successfully',
  APPLICATION_APPROVED: 'Application approved successfully',
  APPLICATION_REJECTED: 'Application rejected successfully',
} as const

export const PAYMENT_AMOUNTS = {
  FIRST_INSTALLMENT: 40000,
  SECOND_INSTALLMENT: 40000,
  TOTAL_PER_TERM: 80000,
} as const

export const ROUTES = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  TIMETABLE: '/timetable',
  ASSIGNMENTS: '/assignments',
  MESSAGES: '/messages',
  ATTENDANCE: '/attendance',
  GRADES: '/grades',
  REPORT_CARD: '/report-card',
  SETTINGS: '/settings',
  APPLICATIONS: '/admin/applications',
  ANALYTICS: '/admin/analytics',
  TEACHER_DASHBOARD: '/teacher/dashboard',
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '/404',
  ERROR: '/error',
} as const