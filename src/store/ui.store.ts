import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'dark' | 'light'

type UIState = {
  sidebarCollapsed: boolean
  theme: Theme
  notificationsOpen: boolean
  toggleSidebar: () => void
  toggleTheme: () => void
  toggleNotifications: () => void
  closeNotifications: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      theme: 'dark',
      notificationsOpen: false,

      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),

      toggleNotifications: () =>
        set((state) => ({
          notificationsOpen: !state.notificationsOpen,
        })),

      closeNotifications: () =>
        set({
          notificationsOpen: false,
        }),
    }),
    {
      name: 'nexora-ui',
    }
  )
)