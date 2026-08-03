import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import StatCard from '../../shared/ui/StatCard'
import { useDashboardStats } from './useDashboardStats'
import { useRevenueTrend } from './useRevenueTrend'

function DashboardPage() {
  const { data: stats = [], isLoading: sl, isError: se } = useDashboardStats()
  const { data: trend = [], isLoading: tl, isError: te } = useRevenueTrend()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-neutral-500">Real-time enterprise metrics and activity.</p>
      </div>

      {se ? (
        <div className="rounded-xl border border-red-500/20 bg-[#111] p-4 text-sm text-red-400">Failed to load stats.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sl
            ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-28 animate-pulse rounded-xl border border-[#1e1e1e] bg-[#111]" />)
            : stats.map((s) => <StatCard key={s.id} stat={s} />)}
        </div>
      )}

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-xl border border-[#1e1e1e] bg-[#111] p-5 xl:col-span-2">
          <h3 className="text-sm font-semibold text-white">Revenue Trend</h3>
          <p className="mt-0.5 text-xs text-neutral-600">Monthly performance across recent periods.</p>

          <div className="mt-5 h-72">
            {te ? (
              <div className="flex h-full items-center justify-center rounded-lg bg-[#0a0a0a] text-sm text-red-400">Chart error.</div>
            ) : tl ? (
              <div className="h-full animate-pulse rounded-lg bg-[#0a0a0a]" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend}>
                  <defs>
                    <linearGradient id="rf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fff" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
                  <XAxis dataKey="label" stroke="#525252" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis stroke="#525252" tickLine={false} axisLine={false} fontSize={12} />
                  <Tooltip contentStyle={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', color: '#fff', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#fff" fill="url(#rf)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-[#1e1e1e] bg-[#111] p-5">
          <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
          <ul className="mt-4 space-y-3 text-xs text-neutral-400">
            <li>• New enterprise client onboarded</li>
            <li>• Quarterly analytics synced</li>
            <li>• Finance team permissions updated</li>
            <li>• Infrastructure report generated</li>
            <li>• Access rules reviewed</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage