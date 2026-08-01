import { appConfig } from '../../config/app'
import Switch from '../../shared/ui/Switch'
import {
  useSettingsStore,
  type SettingsToggleKey,
} from '../../store/settings.store'
import { useUIStore } from '../../store/ui.store'

const securitySettings: {
  key: SettingsToggleKey
  title: string
  description: string
}[] = [
  {
    key: 'twoFactorAuth',
    title: 'Two-Factor Authentication',
    description: 'Require an additional verification step for privileged access.',
  },
  {
    key: 'auditLogs',
    title: 'Audit Logging',
    description: 'Maintain detailed activity records for compliance readiness.',
  },
]

const notificationSettings: {
  key: SettingsToggleKey
  title: string
  description: string
}[] = [
  {
    key: 'emailAlerts',
    title: 'Email Alerts',
    description: 'Send critical workspace and operational alerts by email.',
  },
  {
    key: 'weeklyReports',
    title: 'Weekly Reports',
    description: 'Deliver a summarized performance report every week.',
  },
]

function SettingsPage() {
  const theme = useUIStore((state) => state.theme)

  const emailAlerts = useSettingsStore((state) => state.emailAlerts)
  const weeklyReports = useSettingsStore((state) => state.weeklyReports)
  const twoFactorAuth = useSettingsStore((state) => state.twoFactorAuth)
  const auditLogs = useSettingsStore((state) => state.auditLogs)
  const setSetting = useSettingsStore((state) => state.setSetting)

  const settingsValues: Record<SettingsToggleKey, boolean> = {
    emailAlerts,
    weeklyReports,
    twoFactorAuth,
    auditLogs,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Settings
        </h1>
        <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
          Configure workspace preferences, security controls, and reporting behavior.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
          >
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Security Controls
            </h2>
            <div className="mt-6 space-y-5">
              {securitySettings.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-4 rounded-xl p-4"
                  style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}
                >
                  <div>
                    <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                      {item.description}
                    </p>
                  </div>

                  <Switch
                    checked={settingsValues[item.key]}
                    onChange={(value) => setSetting(item.key, value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
          >
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Notifications & Reports
            </h2>
            <div className="mt-6 space-y-5">
              {notificationSettings.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-4 rounded-xl p-4"
                  style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}
                >
                  <div>
                    <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                      {item.description}
                    </p>
                  </div>

                  <Switch
                    checked={settingsValues[item.key]}
                    onChange={(value) => setSetting(item.key, value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
        >
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Workspace Summary
          </h2>

          <div className="mt-6 space-y-4">
            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}
            >
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Application</p>
              <h3 className="mt-1 font-semibold" style={{ color: 'var(--text-primary)' }}>
                {appConfig.appName}
              </h3>
            </div>

            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}
            >
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Current Theme</p>
              <h3 className="mt-1 font-semibold capitalize" style={{ color: 'var(--text-primary)' }}>
                {theme}
              </h3>
            </div>

            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}
            >
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Security Posture</p>
              <h3 className="mt-1 font-semibold" style={{ color: 'var(--text-primary)' }}>
                {twoFactorAuth && auditLogs ? 'Hardened' : 'Standard'}
              </h3>
            </div>

            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}
            >
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Reporting</p>
              <h3 className="mt-1 font-semibold" style={{ color: 'var(--text-primary)' }}>
                {weeklyReports ? 'Automated Weekly Summary' : 'Manual Only'}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage