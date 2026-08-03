import clsx from 'clsx'
import type { DashboardStat } from '../../types/dashboard'

function StatCard({ stat }: { stat: DashboardStat }) {
  return (
    <div className="rounded-xl border border-[#1e1e1e] bg-[#111] p-5">
      <p className="text-xs font-medium text-neutral-500">{stat.title}</p>
      <h3 className="mt-2 text-2xl font-bold text-white">{stat.value}</h3>
      <span
        className={clsx(
          'mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold',
          stat.trend === 'up' && 'bg-emerald-500/10 text-emerald-400',
          stat.trend === 'down' && 'bg-red-500/10 text-red-400',
          stat.trend === 'stable' && 'bg-neutral-500/10 text-neutral-400'
        )}
      >
        {stat.change}
      </span>
    </div>
  )
}

export default StatCard