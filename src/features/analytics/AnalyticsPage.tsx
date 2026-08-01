import { useAnalytics } from './useAnalytics'

function AnalyticsPage() {
  const { data, isLoading, isError } = useAnalytics()

  if (isError) {
    return (
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--danger)', color: 'var(--danger)' }}
      >
        Failed to load analytics data.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
      >
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Analytics
        </h1>
        <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
          Deep insights, KPI trends, and traffic intelligence.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-32 animate-pulse rounded-xl"
                  style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}
                />
              ))
            : data?.metrics.map((metric) => (
                <div
                  key={metric.id}
                  className="rounded-xl p-5"
                  style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}
                >
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {metric.label}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {metric.value}
                  </h3>
                  <p className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    {metric.description}
                  </p>
                </div>
              ))}
        </div>
      </div>

      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
      >
        <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Traffic Sources
        </h2>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          Distribution of incoming traffic across acquisition channels.
        </p>

        <div className="mt-8 space-y-5">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 w-40 animate-pulse rounded" style={{ backgroundColor: 'var(--bg-input)' }} />
                  <div className="h-3 w-full animate-pulse rounded" style={{ backgroundColor: 'var(--bg-input)' }} />
                </div>
              ))
            : data?.trafficSources.map((item) => (
                <div key={item.id}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span style={{ color: 'var(--text-secondary)' }}>{item.source}</span>
                    <span style={{ color: 'var(--text-muted)' }}>
                      {item.visitors.toLocaleString()} · {item.percentage}%
                    </span>
                  </div>

                  <div
                    className="h-3 overflow-hidden rounded-full"
                    style={{ backgroundColor: 'var(--bg-input)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: 'var(--accent)',
                      }}
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