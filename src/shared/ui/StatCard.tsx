import clsx from 'clsx'
import type { DashboardStat } from '../../types/dashboard'

type StatCardProps = {
  stat: DashboardStat
}

function StatCard({ stat }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
      <p className="text-sm text-zinc-400">{stat.title}</p>
      <h3 className="mt-3 text-2xl font-bold text-white">{stat.value}</h3>

      <span
        className={clsx(
          'mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-medium',
          stat.trend === 'up' && 'bg-emerald-500/15 text-emerald-400',
          stat.trend === 'down' && 'bg-red-500/15 text-red-400',
          stat.trend === 'stable' && 'bg-zinc-500/15 text-zinc-300'
        )}
      >
        {stat.change}
      </span>
    </div>
  )
}

export default StatCard