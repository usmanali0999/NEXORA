import { Link, Outlet, useLocation } from 'react-router-dom'
import { BarChart3, LayoutDashboard, LogOut, Settings, Users } from 'lucide-react'
import clsx from 'clsx'
import { useAuthStore } from '../store/auth.store'

const navItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Users', path: '/users', icon: Users },
  { label: 'Settings', path: '/settings', icon: Settings },
]

function DashboardLayout() {
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="flex min-h-screen">
        <aside className="w-72 border-r border-white/10 bg-zinc-900/70 p-6">
          <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-wide">NEXORA</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Enterprise Control Center
            </p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-white text-zinc-950'
                      : 'text-zinc-300 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-white/10 bg-zinc-950/80 px-8 py-5">
            <div>
              <h2 className="text-lg font-semibold">Welcome back</h2>
              <p className="text-sm text-zinc-400">
                Manage your enterprise operations from one place.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs uppercase tracking-wide text-zinc-400">
                  {user?.role}
                </p>
              </div>

              <button
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/10"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </header>

          <main className="flex-1 p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout