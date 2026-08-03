import { appConfig } from '../../config/app'
import Switch from '../../shared/ui/Switch'
import { useSettingsStore, type SettingsToggleKey } from '../../store/settings.store'

const security: { key: SettingsToggleKey; title: string; desc: string }[] = [
  { key: 'twoFactorAuth', title: 'Two-Factor Auth', desc: 'Additional verification for privileged access.' },
  { key: 'auditLogs', title: 'Audit Logging', desc: 'Detailed activity records for compliance.' },
]

const noti: { key: SettingsToggleKey; title: string; desc: string }[] = [
  { key: 'emailAlerts', title: 'Email Alerts', desc: 'Critical workspace alerts by email.' },
  { key: 'weeklyReports', title: 'Weekly Reports', desc: 'Automated weekly performance summary.' },
]

function SettingsPage() {
  const ea = useSettingsStore((s) => s.emailAlerts)
  const wr = useSettingsStore((s) => s.weeklyReports)
  const tfa = useSettingsStore((s) => s.twoFactorAuth)
  const al = useSettingsStore((s) => s.auditLogs)
  const set = useSettingsStore((s) => s.setSetting)
  const vals: Record<SettingsToggleKey, boolean> = { emailAlerts: ea, weeklyReports: wr, twoFactorAuth: tfa, auditLogs: al }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-neutral-500">Workspace preferences and security controls.</p>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          <div className="rounded-xl border border-[#1e1e1e] bg-[#111] p-5">
            <h2 className="text-sm font-semibold text-white">Security</h2>
            <div className="mt-4 space-y-3">
              {security.map((i) => (
                <div key={i.key} className="flex items-center justify-between gap-4 rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] p-4">
                  <div><h3 className="text-sm font-medium text-white">{i.title}</h3><p className="mt-0.5 text-xs text-neutral-500">{i.desc}</p></div>
                  <Switch checked={vals[i.key]} onChange={(v) => set(i.key, v)} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#1e1e1e] bg-[#111] p-5">
            <h2 className="text-sm font-semibold text-white">Notifications</h2>
            <div className="mt-4 space-y-3">
              {noti.map((i) => (
                <div key={i.key} className="flex items-center justify-between gap-4 rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] p-4">
                  <div><h3 className="text-sm font-medium text-white">{i.title}</h3><p className="mt-0.5 text-xs text-neutral-500">{i.desc}</p></div>
                  <Switch checked={vals[i.key]} onChange={(v) => set(i.key, v)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#1e1e1e] bg-[#111] p-5">
          <h2 className="text-sm font-semibold text-white">Workspace</h2>
          <div className="mt-4 space-y-3">
            {[
              { l: 'App', v: appConfig.appName },
              { l: 'Theme', v: 'Dark' },
              { l: 'Security', v: tfa && al ? 'Hardened' : 'Standard' },
              { l: 'Reports', v: wr ? 'Auto Weekly' : 'Manual' },
            ].map((c) => (
              <div key={c.l} className="rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] p-3">
                <p className="text-[11px] text-neutral-500">{c.l}</p>
                <p className="mt-1 text-sm font-medium text-white">{c.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage