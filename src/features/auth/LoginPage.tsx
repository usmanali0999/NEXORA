import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuthStore, type UserRole } from '../../store/auth.store'

function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  const handleLogin = (role: UserRole) => {
    login(role)
    toast.success(`Logged in as ${role}`)
    navigate('/')
  }

  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090b] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#1e1e1e] bg-[#111] p-10">
        <h1 className="text-3xl font-bold text-white tracking-wide">NEXORA</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Enterprise dashboard access portal
        </p>

        <div className="mt-10 space-y-3">
          <button
            onClick={() => handleLogin('admin')}
            className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
          >
            Login as Admin
          </button>
          <button
            onClick={() => handleLogin('manager')}
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Login as Manager
          </button>
          <button
            onClick={() => handleLogin('analyst')}
            className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Login as Analyst
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage