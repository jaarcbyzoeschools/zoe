import React from 'react'
import { GraduationCap } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  variant?: 'light' | 'dark'
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  variant = 'dark' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  const textClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  }

//   const iconColor = variant === 'light' ? 'text-white' : 'text-primary'
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900'

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} bg-primary rounded-lg flex items-center justify-center`}>
        <GraduationCap className={`${sizeClasses[size]} text-white`} />
      </div>
      {showText && (
        <div>
          <h1 className={`${textClasses[size]} font-bold ${textColor} leading-tight`}>
            Zoes Schools
          </h1>
          <p className="text-xs text-gray-600">Educational Excellence</p>
        </div>
      )}
    </div>
  )
}