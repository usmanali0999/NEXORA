import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UIState = {
  sidebarCollapsed: boolean
  notificationsOpen: boolean
  toggleSidebar: () => void
  toggleNotifications: () => void
  closeNotifications: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      notificationsOpen: false,

      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),

      toggleNotifications: () =>
        set((state) => ({
          notificationsOpen: !state.notificationsOpen,
        })),

      closeNotifications: () =>
        set({ notificationsOpen: false }),
    }),
    { name: 'nexora-ui' }
  )
)