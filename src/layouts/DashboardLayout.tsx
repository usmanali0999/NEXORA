import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  BarChart3,
  Bell,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  Users,
} from 'lucide-react'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import { useAuthStore, type UserRole } from '../store/auth.store'
import { useUIStore } from '../store/ui.store'
import { useNotifications } from '../features/dashboard/useNotifications'
import NotificationPanel from '../shared/ui/NotificationPanel'

const navItems = [
  {
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
    roles: ['admin', 'manager', 'analyst'] as UserRole[],
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
    roles: ['admin', 'manager', 'analyst'] as UserRole[],
  },
  {
    label: 'Users',
    path: '/users',
    icon: Users,
    roles: ['admin', 'manager'] as UserRole[],
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings,
    roles: ['admin'] as UserRole[],
  },
]

function DashboardLayout() {
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed)
  const theme = useUIStore((state) => state.theme)
  const notificationsOpen = useUIStore((state) => state.notificationsOpen)
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const toggleTheme = useUIStore((state) => state.toggleTheme)
  const toggleNotifications = useUIStore((state) => state.toggleNotifications)
  const closeNotifications = useUIStore((state) => state.closeNotifications)

  const { data: notifications = [], isLoading: notificationsLoading } =
    useNotifications()

  const unreadCount = notifications.filter((item) => item.unread).length

  const visibleNavItems = navItems.filter(
    (item) => user && item.roles.includes(user.role)
  )

  const handleLogout = () => {
    closeNotifications()
    logout()
    toast.success('Logged out successfully')
  }

  return (
    <div
      className="min-h-screen transition-colors duration-200"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside
          className={clsx(
            'flex flex-col transition-all duration-300',
            sidebarCollapsed ? 'w-[72px]' : 'w-[280px]'
          )}
          style={{
            backgroundColor: 'var(--bg-sidebar)',
            borderRight: '1px solid var(--border-primary)',
          }}
        >
          {/* Logo */}
          <div
            className={clsx(
              'flex items-center px-5 py-6',
              sidebarCollapsed ? 'justify-center' : 'justify-between'
            )}
            style={{ borderBottom: '1px solid var(--border-primary)' }}
          >
            {!sidebarCollapsed && (
              <div>
                <h1
                  className="text-2xl font-extrabold tracking-wider"
                  style={{ color: 'var(--text-primary)' }}
                >
                  NEXORA
                </h1>
                <p
                  className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Enterprise Platform
                </p>
              </div>
            )}

            <button
              onClick={toggleSidebar}
              className="rounded-lg p-2 transition hover:opacity-80"
              style={{ color: 'var(--text-muted)' }}
            >
              <Menu size={18} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {visibleNavItems.map((item) => {
              const Icon = item.icon
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path)

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={clsx(
                    'flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-medium transition-all',
                    sidebarCollapsed && 'justify-center'
                  )}
                  style={{
                    backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                    color: isActive ? 'var(--accent-text)' : 'var(--text-muted)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--border-primary)'
                      e.currentTarget.style.color = 'var(--text-primary)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = 'var(--text-muted)'
                    }
                  }}
                >
                  <Icon size={18} className="shrink-0" />
                  {!sidebarCollapsed && item.label}
                </Link>
              )
            })}
          </nav>

          {/* Bottom User */}
          {!sidebarCollapsed && (
            <div className="p-4" style={{ borderTop: '1px solid var(--border-primary)' }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--accent-text)',
                  }}
                >
                  {user?.name?.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p
                    className="truncate text-sm font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {user?.name}
                  </p>
                  <p
                    className="truncate text-[11px] font-medium uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {user?.role}
                  </p>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main */}
        <div className="flex flex-1 flex-col">

          {/* Header */}
          <header
            className="flex items-center justify-between px-8 py-5"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderBottom: '1px solid var(--border-primary)',
            }}
          >
            <div>
              <h2 className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                Welcome back,{' '}
                <span style={{ color: 'var(--text-primary)' }}>{user?.name}</span>
              </h2>
              <p className="mt-1 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                Manage operations, insights, and team access in one place.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Notifications */}
              <button
                onClick={toggleNotifications}
                className="relative inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-[13px] transition hover:opacity-80"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-primary)',
                }}
              >
                <Bell size={15} />
                Alerts
                {unreadCount > 0 && (
                  <span
                    className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--accent-text)',
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Theme */}
              <button
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-[13px] transition hover:opacity-80"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-primary)',
                }}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                {theme === 'dark' ? 'Light' : 'Dark'}
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-[13px] transition hover:opacity-80"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--danger)',
                  border: '1px solid var(--border-primary)',
                }}
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <Outlet />
          </main>
        </div>
      </div>

      {/* Notification Panel */}
      <NotificationPanel
        open={notificationsOpen}
        isLoading={notificationsLoading}
        notifications={notifications}
        onClose={closeNotifications}
      />
    </div>
  )
}

export default DashboardLayout