import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore, type UserRole } from '../store/auth.store'

type RoleGuardProps = {
  allowedRoles: UserRole[]
  children: ReactNode
}

function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const user = useAuthStore((state) => state.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}

export default RoleGuard