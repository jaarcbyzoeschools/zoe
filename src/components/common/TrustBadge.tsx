import React from 'react'
import { Shield, Lock, Users } from 'lucide-react'

interface TrustBadgeProps {
  type: 'secure' | 'trusted' | 'verified'
  size?: 'sm' | 'md'
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ type, size = 'md' }) => {
  const badges = {
    secure: {
      icon: Lock,
      label: 'Bank-Level Security',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    trusted: {
      icon: Users,
      label: 'Trusted by 5000+ Students',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    verified: {
      icon: Shield,
      label: 'Verified Institution',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  }

  const badge = badges[type]
  const Icon = badge.icon

  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5'

  return (
    <div className={`inline-flex items-center gap-2 ${sizeClasses} rounded-full ${badge.bgColor}`}>
      <Icon className="w-4 h-4" />
      <span className={`font-medium ${badge.color}`}>{badge.label}</span>
    </div>
  )
}