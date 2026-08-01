import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../store/auth.store'
import type { UserRole } from '../../store/auth.store'

function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const handleLogin = (role: UserRole) => {
    login(role)
    toast.success(`${role} session started`)
    navigate('/')
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 transition-colors duration-200"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-xl"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-primary)',
        }}
      >
        <h1
          className="text-3xl font-extrabold tracking-wider"
          style={{ color: 'var(--text-primary)' }}
        >
          NEXORA
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          Sign in to access the enterprise dashboard
        </p>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => handleLogin('admin')}
            className="w-full rounded-xl px-4 py-3 font-medium transition hover:opacity-90"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-text)',
            }}
          >
            Login as Admin
          </button>

          <button
            onClick={() => handleLogin('manager')}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-500"
          >
            Login as Manager
          </button>

          <button
            onClick={() => handleLogin('analyst')}
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white transition hover:bg-emerald-500"
          >
            Login as Analyst
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage