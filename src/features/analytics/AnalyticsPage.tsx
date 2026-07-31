import { useAnalytics } from './useAnalytics'

function AnalyticsPage() {
  const { data, isLoading, isError } = useAnalytics()

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-zinc-900 p-6 text-red-400">
        Failed to load analytics data.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="mt-2 text-zinc-400">
          Deep insights, KPI trends, and traffic intelligence.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-32 animate-pulse rounded-xl border border-white/10 bg-zinc-950"
                />
              ))
            : data?.metrics.map((metric) => (
                <div key={metric.id} className="rounded-xl border border-white/10 bg-zinc-950 p-5">
                  <p className="text-sm text-zinc-400">{metric.label}</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">{metric.value}</h3>
                  <p className="mt-2 text-xs text-zinc-500">{metric.description}</p>
                </div>
              ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
        <h2 className="text-xl font-semibold text-white">Traffic Sources</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Distribution of incoming traffic across acquisition channels.
        </p>

        <div className="mt-8 space-y-5">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 w-40 animate-pulse rounded bg-zinc-800" />
                  <div className="h-3 w-full animate-pulse rounded bg-zinc-800" />
                </div>
              ))
            : data?.trafficSources.map((item) => (
                <div key={item.id}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-zinc-300">{item.source}</span>
                    <span className="text-zinc-400">
                      {item.visitors.toLocaleString()} · {item.percentage}%
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-white"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage