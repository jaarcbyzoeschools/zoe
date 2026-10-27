import React from 'react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex gap-3 text-left">
      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-600 mt-0.5">{description}</p>
      </div>
    </div>
  )
}