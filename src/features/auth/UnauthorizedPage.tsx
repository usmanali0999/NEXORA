import { Link } from 'react-router-dom'

function UnauthorizedPage() {
  return (
    <div
      className="rounded-2xl p-8"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--danger)',
      }}
    >
      <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
        Access Denied
      </h1>
      <p className="mt-3" style={{ color: 'var(--text-muted)' }}>
        You do not have permission to access this section.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex rounded-xl px-4 py-3 text-sm font-medium transition hover:opacity-90"
        style={{
          backgroundColor: 'var(--accent)',
          color: 'var(--accent-text)',
        }}
      >
        Back to Dashboard
      </Link>
    </div>
  )
}

export default UnauthorizedPage