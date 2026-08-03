import { Link, Outlet, useLocation } from 'react-router-dom'
import { BarChart3, Bell, LayoutDashboard, LogOut, Menu, Settings, Users } from 'lucide-react'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import { useAuthStore, type UserRole } from '../store/auth.store'
import { useUIStore } from '../store/ui.store'
import { useNotifications } from '../features/dashboard/useNotifications'
import NotificationPanel from '../shared/ui/NotificationPanel'

const navItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard, roles: ['admin', 'manager', 'analyst'] as UserRole[] },
  { label: 'Analytics', path: '/analytics', icon: BarChart3, roles: ['admin', 'manager', 'analyst'] as UserRole[] },
  { label: 'Users', path: '/users', icon: Users, roles: ['admin', 'manager'] as UserRole[] },
  { label: 'Settings', path: '/settings', icon: Settings, roles: ['admin'] as UserRole[] },
]

function DashboardLayout() {
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const collapsed = useUIStore((s) => s.sidebarCollapsed)
  const notiOpen = useUIStore((s) => s.notificationsOpen)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const toggleNoti = useUIStore((s) => s.toggleNotifications)
  const closeNoti = useUIStore((s) => s.closeNotifications)

  const { data: notifications = [], isLoading: notiLoading } = useNotifications()
  const unread = notifications.filter((n) => n.unread).length
  const visibleNav = navItems.filter((i) => user && i.roles.includes(user.role))

  return (
    <div className="flex min-h-screen bg-[#09090b] text-white">

      {/* Sidebar */}
      <aside
        className={clsx(
          'flex flex-col border-r border-[#1e1e1e] bg-[#111] transition-all duration-300',
          collapsed ? 'w-[68px]' : 'w-[260px]'
        )}
      >
        {/* Logo */}
        <div className={clsx('flex items-center border-b border-[#1e1e1e] px-4 py-5', collapsed ? 'justify-center' : 'justify-between')}>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold tracking-widest text-white">NEXORA</h1>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.25em] text-neutral-600">
                Enterprise Platform
              </p>
            </div>
          )}
          <button onClick={toggleSidebar} className="rounded-lg p-1.5 text-neutral-500 hover:bg-[#1a1a1a] hover:text-white transition">
            <Menu size={18} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 space-y-0.5 px-2 py-4">
          {visibleNav.map((item) => {
            const Icon = item.icon
            const active = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all',
                  active ? 'bg-white text-black' : 'text-neutral-500 hover:bg-[#1a1a1a] hover:text-white',
                  collapsed && 'justify-center px-2'
                )}
              >
                <Icon size={17} className="shrink-0" />
                {!collapsed && item.label}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        {!collapsed && (
          <div className="border-t border-[#1e1e1e] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1a1a] text-xs font-bold text-white">
                {user?.name?.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-neutral-300">{user?.name}</p>
                <p className="truncate text-[10px] font-medium uppercase tracking-wider text-neutral-600">{user?.role}</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">

        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#1e1e1e] bg-[#09090b] px-6 py-4">
          <div>
            <p className="text-sm font-medium text-neutral-300">
              Welcome back, <span className="text-white">{user?.name}</span>
            </p>
            <p className="mt-0.5 text-xs text-neutral-600">
              Manage operations, insights, and team access.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleNoti}
              className="relative flex items-center gap-1.5 rounded-lg border border-[#1e1e1e] bg-[#111] px-3 py-2 text-xs text-neutral-400 transition hover:bg-[#1a1a1a] hover:text-white"
            >
              <Bell size={14} />
              Alerts
              {unread > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-black">
                  {unread}
                </span>
              )}
            </button>

            <button
              onClick={() => { closeNoti(); logout(); toast.success('Logged out') }}
              className="flex items-center gap-1.5 rounded-lg border border-[#1e1e1e] bg-[#111] px-3 py-2 text-xs text-neutral-400 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>

      <NotificationPanel open={notiOpen} isLoading={notiLoading} notifications={notifications} onClose={closeNoti} />
    </div>
  )
}

export default DashboardLayout