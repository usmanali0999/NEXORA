function DashboardPage() {
  const stats = [
    { title: 'Revenue', value: '$128,430' },
    { title: 'Active Users', value: '8,492' },
    { title: 'Conversion Rate', value: '12.8%' },
    { title: 'System Health', value: '99.94%' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="mt-2 text-zinc-400">
          Monitor enterprise performance, growth, and infrastructure metrics.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-zinc-900 p-5"
          >
            <p className="text-sm text-zinc-400">{item.title}</p>
            <h3 className="mt-3 text-2xl font-bold">{item.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6 xl:col-span-2">
          <h3 className="text-lg font-semibold">Performance Trend</h3>
          <div className="mt-6 flex h-72 items-center justify-center rounded-xl border border-dashed border-white/10 text-zinc-500">
            Chart Area
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <ul className="mt-6 space-y-4 text-sm text-zinc-300">
            <li>New enterprise client onboarded</li>
            <li>Quarterly analytics synced successfully</li>
            <li>Permissions updated for finance team</li>
            <li>Infrastructure report generated</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage