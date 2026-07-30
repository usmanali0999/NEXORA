function AnalyticsPage() {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <p className="mt-2 text-zinc-400">
        Deep insights, KPI trends, and data intelligence modules will appear here.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-zinc-950 p-5">
          <p className="text-sm text-zinc-400">Traffic Growth</p>
          <h3 className="mt-2 text-2xl font-bold">+24.6%</h3>
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-950 p-5">
          <p className="text-sm text-zinc-400">Retention</p>
          <h3 className="mt-2 text-2xl font-bold">81.2%</h3>
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-950 p-5">
          <p className="text-sm text-zinc-400">Engagement</p>
          <h3 className="mt-2 text-2xl font-bold">67.4%</h3>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage