const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
}

const logLevel = import.meta.env.MODE === 'production' ? 'ERROR' : 'INFO'

const shouldLog = (level: string): boolean => {
  const levels = ['ERROR', 'WARN', 'INFO']
  return levels.indexOf(level) <= levels.indexOf(logLevel)
}

export const logger = {
  error: (message: string, error?: unknown): void => {
    if (shouldLog(LOG_LEVELS.ERROR)) {
      console.error(`[${LOG_LEVELS.ERROR}] ${message}`, error)
    }
  },

  warn: (message: string, data?: unknown): void => {
    if (shouldLog(LOG_LEVELS.WARN)) {
      console.warn(`[${LOG_LEVELS.WARN}] ${message}`, data)
    }
  },

  info: (message: string, data?: unknown): void => {
    if (shouldLog(LOG_LEVELS.INFO)) {
      console.log(`[${LOG_LEVELS.INFO}] ${message}`, data)
    }
  },
}