import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SettingsToggleKey =
  | 'emailAlerts'
  | 'weeklyReports'
  | 'twoFactorAuth'
  | 'auditLogs'

type SettingsState = {
  emailAlerts: boolean
  weeklyReports: boolean
  twoFactorAuth: boolean
  auditLogs: boolean
  setSetting: (key: SettingsToggleKey, value: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      emailAlerts: true,
      weeklyReports: true,
      twoFactorAuth: false,
      auditLogs: true,

      setSetting: (key, value) =>
        set({
          [key]: value,
        } as Pick<SettingsState, SettingsToggleKey>),
    }),
    {
      name: 'nexora-settings',
    }
  )
)