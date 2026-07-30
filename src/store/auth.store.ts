import { create } from 'zustand'

export type UserRole = 'admin' | 'manager' | 'analyst'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
}

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  login: (role: UserRole) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (role) =>
    set({
      isAuthenticated: true,
      user: {
        id: 'usr_001',
        name: 'Usman Ali',
        email: 'usman@nexora.com',
        role,
      },
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}))