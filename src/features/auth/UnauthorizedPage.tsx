import { Link } from 'react-router-dom'

function UnauthorizedPage() {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-zinc-900 p-8">
      <h1 className="text-3xl font-bold text-white">Access Denied</h1>
      <p className="mt-3 text-zinc-400">
        You do not have permission to access this section.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex rounded-xl bg-white px-4 py-3 text-sm font-medium text-zinc-950 transition hover:opacity-90"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}

export default UnauthorizedPage