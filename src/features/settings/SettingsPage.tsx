function SettingsPage() {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="mt-2 text-zinc-400">
        Global application settings, preferences, and security configuration.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-zinc-950 p-5">
          <h3 className="font-semibold">Workspace Settings</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Manage organization preferences and operational defaults.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-950 p-5">
          <h3 className="font-semibold">Security Controls</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Configure session policies, access restrictions, and audit readiness.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage