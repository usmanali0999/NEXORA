import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import StatCard from '../../shared/ui/StatCard'
import { useDashboardStats } from './useDashboardStats'
import { useRevenueTrend } from './useRevenueTrend'

function DashboardPage() {
  const { data: stats = [], isLoading: statsLoading, isError: statsError } = useDashboardStats()
  const { data: trendData = [], isLoading: trendLoading, isError: trendError } = useRevenueTrend()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Dashboard Overview
        </h1>
        <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
          Monitor enterprise performance, growth, and infrastructure metrics.
        </p>
      </div>

      {statsError ? (
        <div
          className="rounded-2xl p-5"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--danger)', color: 'var(--danger)' }}
        >
          Failed to load dashboard stats.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {statsLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-32 animate-pulse rounded-2xl"
                  style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
                />
              ))
            : stats.map((stat) => <StatCard key={stat.id} stat={stat} />)}
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-3">
        <div
          className="rounded-2xl p-6 xl:col-span-2"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
        >
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            Revenue Trend
          </h3>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
            Monthly revenue movement across recent periods.
          </p>

          <div className="mt-6 h-80">
            {trendError ? (
              <div
                className="flex h-full items-center justify-center rounded-xl"
                style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--danger)' }}
              >
                Failed to load chart data.
              </div>
            ) : trendLoading ? (
              <div
                className="h-full animate-pulse rounded-xl"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                  <XAxis dataKey="label" stroke="var(--text-muted)" tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-primary)',
                      borderRadius: '12px',
                      color: 'var(--text-primary)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--accent)"
                    fill="url(#revenueFill)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
        >
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            Recent Activity
          </h3>
          <ul className="mt-6 space-y-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li>New enterprise client onboarded</li>
            <li>Quarterly analytics synced successfully</li>
            <li>Permissions updated for finance team</li>
            <li>Infrastructure report generated</li>
            <li>Role-based access rules reviewed</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage