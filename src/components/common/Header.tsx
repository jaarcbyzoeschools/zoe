import React from 'react'
import { Menu, LogOut, User, Settings } from 'lucide-react'

interface HeaderProps {
  userName: string
  userRole: string
  onLogout: () => void
  onMenuToggle?: () => void
  showMenuButton?: boolean
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  userRole,
  onLogout,
  onMenuToggle,
  showMenuButton = false,
}) => {
  const [showDropdown, setShowDropdown] = React.useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-4">
          {showMenuButton && (
            <button
              onClick={onMenuToggle}
              className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Zoes Schools</h1>
            <p className="text-xs text-gray-500 capitalize">{userRole}</p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="User menu"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-medium">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-gray-900 hidden sm:inline">{userName}</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <a
                href="#profile"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-200"
              >
                <User className="w-4 h-4" />
                Profile
              </a>
              <a
                href="#settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-200"
              >
                <Settings className="w-4 h-4" />
                Settings
              </a>
              <button
                onClick={() => {
                  setShowDropdown(false)
                  onLogout()
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}