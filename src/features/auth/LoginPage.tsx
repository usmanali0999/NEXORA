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
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white">NEXORA</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Sign in to access the enterprise dashboard
        </p>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => handleLogin('admin')}
            className="w-full rounded-xl bg-white px-4 py-3 font-medium text-zinc-950 transition hover:opacity-90"
          >
            Login as Admin
          </button>

          <button
            onClick={() => handleLogin('manager')}
            className="w-full rounded-xl bg-blue-500 px-4 py-3 font-medium text-white transition hover:bg-blue-400"
          >
            Login as Manager
          </button>

          <button
            onClick={() => handleLogin('analyst')}
            className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-medium text-white transition hover:bg-emerald-400"
          >
            Login as Analyst
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage