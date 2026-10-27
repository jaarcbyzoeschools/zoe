import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Clock,
  BookOpen,
  MessageSquare,
  CheckSquare,
  FileText,
  Settings,
} from 'lucide-react'
import { Header } from '@components/common/Header'
import { Sidebar, NavGroup } from '@components/common/Sidebar'
import { ToastContainer } from '@components/common/ToastContainer'
import { useAuth, useToast } from '@hooks/index'
import { ROUTES } from '@constants/index'

export const StudentLayout: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { toasts, removeToast } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN)
  }

  const navGroups: NavGroup[] = [
    {
      title: 'Menu',
      items: [
        {
          label: 'Dashboard',
          path: ROUTES.DASHBOARD,
          icon: <LayoutDashboard className="w-4 h-4" />,
        },
        {
          label: 'Timetable',
          path: ROUTES.TIMETABLE,
          icon: <Clock className="w-4 h-4" />,
        },
        {
          label: 'Assignments',
          path: ROUTES.ASSIGNMENTS,
          icon: <BookOpen className="w-4 h-4" />,
        },
        {
          label: 'Messages',
          path: ROUTES.MESSAGES,
          icon: <MessageSquare className="w-4 h-4" />,
          badge: '2',
        },
        {
          label: 'Attendance',
          path: ROUTES.ATTENDANCE,
          icon: <CheckSquare className="w-4 h-4" />,
        },
        {
          label: 'Grades & Reports',
          path: ROUTES.GRADES,
          icon: <FileText className="w-4 h-4" />,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          label: 'Settings',
          path: ROUTES.SETTINGS,
          icon: <Settings className="w-4 h-4" />,
        },
      ],
    },
  ]

  return (
    <div className="h-screen bg-gray-50 flex flex-col lg:flex-row">
      <Sidebar
        navGroups={navGroups}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          userName={user?.email || 'User'}
          userRole={user?.role || 'Student'}
          onLogout={handleLogout}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          showMenuButton
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>

      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  )
}