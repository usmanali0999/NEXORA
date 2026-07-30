import StatCard from '../../shared/ui/StatCard'
import { useDashboardStats } from './useDashboardStats'

function DashboardPage() {
  const { data: stats = [], isLoading, isError } = useDashboardStats()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="mt-2 text-zinc-400">
          Monitor enterprise performance, growth, and infrastructure metrics.
        </p>
      </div>

      {isError ? (
        <div className="rounded-2xl border border-red-500/20 bg-zinc-900 p-5 text-red-400">
          Failed to load dashboard stats.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-32 animate-pulse rounded-2xl border border-white/10 bg-zinc-900"
                />
              ))
            : stats.map((stat) => <StatCard key={stat.id} stat={stat} />)}
        </div>
      )}

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