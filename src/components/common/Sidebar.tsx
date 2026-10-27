import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X, ChevronDown } from 'lucide-react'
import { classNameBuilder } from '@utils/index'

export interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
  badge?: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

interface SidebarProps {
  navGroups: NavGroup[]
  isOpen: boolean
  onClose?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ navGroups, isOpen, onClose }) => {
  const location = useLocation()
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(new Set(['main']))

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(title)) {
        newSet.delete(title)
      } else {
        newSet.add(title)
      }
      return newSet
    })
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={classNameBuilder(
          'fixed lg:static top-0 left-0 h-screen bg-dark text-white w-64 overflow-y-auto transition-transform duration-300 z-40',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-4 flex items-center justify-between lg:justify-start gap-2 border-b border-gray-700">
          <div>
            <h2 className="text-base font-bold">Zoes Schools</h2>
            <p className="text-xs text-gray-400">Student Portal</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navGroups.map((group) => (
            <div key={group.title}>
              <button
                onClick={() => toggleGroup(group.title)}
                className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors uppercase tracking-wider mb-2"
              >
                {group.title}
                <ChevronDown
                  className={classNameBuilder(
                    'w-4 h-4 transition-transform',
                    expandedGroups.has(group.title) && 'rotate-180'
                  )}
                />
              </button>

              {expandedGroups.has(group.title) && (
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={classNameBuilder(
                        'flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-colors relative',
                        isActive(item.path)
                          ? 'bg-primary text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      )}
                    >
                      {item.icon}
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}