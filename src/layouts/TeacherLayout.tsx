import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, FileText, Settings } from 'lucide-react'
import { Header } from '@components/common/Header'
import { Sidebar, NavGroup } from '@components/common/Sidebar'
import { ToastContainer } from '@components/common/ToastContainer'
import { useAuth, useToast } from '@hooks/index'
import { ROUTES } from '@constants/index'

export const TeacherLayout: React.FC = () => {
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
      title: 'Teaching',
      items: [
        {
          label: 'Dashboard',
          path: ROUTES.TEACHER_DASHBOARD,
          icon: <LayoutDashboard className="w-4 h-4" />,
        },
        {
          label: 'Classes',
          path: '/teacher/classes',
          icon: <Users className="w-4 h-4" />,
        },
        {
          label: 'Grades',
          path: '/teacher/grades',
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
          userName={user?.email || 'Teacher'}
          userRole={user?.role || 'Teacher'}
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