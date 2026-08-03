import { Link } from 'react-router-dom'

function UnauthorizedPage() {
  return (
    <div className="rounded-xl border border-red-500/20 bg-[#111] p-8">
      <h1 className="text-2xl font-bold text-white">Access Denied</h1>
      <p className="mt-2 text-sm text-neutral-500">You don't have permission to view this page.</p>
      <Link to="/" className="mt-5 inline-flex rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-200">Back to Dashboard</Link>
    </div>
  )
}

export default UnauthorizedPage