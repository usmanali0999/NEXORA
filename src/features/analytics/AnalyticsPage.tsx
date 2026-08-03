import { useAnalytics } from './useAnalytics'

function AnalyticsPage() {
  const { data, isLoading, isError } = useAnalytics()

  if (isError) return <div className="rounded-xl border border-red-500/20 bg-[#111] p-5 text-sm text-red-400">Failed to load analytics.</div>

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#1e1e1e] bg-[#111] p-5">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-neutral-500">KPI trends and traffic intelligence.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-28 animate-pulse rounded-xl border border-[#1e1e1e] bg-[#0a0a0a]" />)
            : data?.metrics.map((m) => (
                <div key={m.id} className="rounded-xl border border-[#1e1e1e] bg-[#0a0a0a] p-4">
                  <p className="text-xs text-neutral-500">{m.label}</p>
                  <h3 className="mt-1.5 text-xl font-bold text-white">{m.value}</h3>
                  <p className="mt-1.5 text-[11px] text-neutral-600">{m.description}</p>
                </div>
              ))}
        </div>
      </div>

      <div className="rounded-xl border border-[#1e1e1e] bg-[#111] p-5">
        <h2 className="text-sm font-semibold text-white">Traffic Sources</h2>
        <p className="mt-1 text-xs text-neutral-500">Acquisition channel distribution.</p>

        <div className="mt-6 space-y-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3 w-32 animate-pulse rounded bg-[#1a1a1a]" />
                  <div className="h-2.5 w-full animate-pulse rounded bg-[#1a1a1a]" />
                </div>
              ))
            : data?.trafficSources.map((t) => (
                <div key={t.id}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-neutral-300">{t.source}</span>
                    <span className="text-neutral-500">{t.visitors.toLocaleString()} · {t.percentage}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#1a1a1a]">
                    <div className="h-full rounded-full bg-white" style={{ width: `${t.percentage}%` }} />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage