import { useMemo, useState } from 'react'
import DataTable, { type DataTableColumn } from '../../shared/ui/DataTable'
import Input from '../../shared/ui/Input'
import Select from '../../shared/ui/Select'
import { useUsers } from './useUsers'
import type { UserRecord, UserStatus } from '../../types/user'

type RoleFilter = 'all' | UserRecord['role']
type StatusFilter = 'all' | UserStatus

const roleOpts = [{ label: 'All Roles', value: 'all' }, { label: 'Admin', value: 'Admin' }, { label: 'Manager', value: 'Manager' }, { label: 'Analyst', value: 'Analyst' }]
const statusOpts = [{ label: 'All Statuses', value: 'all' }, { label: 'Active', value: 'Active' }, { label: 'Pending', value: 'Pending' }, { label: 'Suspended', value: 'Suspended' }]

const columns: DataTableColumn<UserRecord>[] = [
  { key: 'name', header: 'Name', render: (r) => (<div><p className="font-medium text-white">{r.name}</p><p className="text-[11px] text-neutral-500">{r.email}</p></div>) },
  { key: 'role', header: 'Role', render: (r) => <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-400">{r.role}</span> },
  { key: 'status', header: 'Status', render: (r) => { const c = r.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : r.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'; return <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${c}`}>{r.status}</span> } },
  { key: 'department', header: 'Dept' },
  { key: 'lastActive', header: 'Last Active' },
]

function UsersPage() {
  const { data = [], isLoading, isError } = useUsers()
  const [search, setSearch] = useState('')
  const [role, setRole] = useState<RoleFilter>('all')
  const [status, setStatus] = useState<StatusFilter>('all')

  const summary = useMemo(() => ({ total: data.length, active: data.filter((u) => u.status === 'Active').length, pending: data.filter((u) => u.status === 'Pending').length, suspended: data.filter((u) => u.status === 'Suspended').length }), [data])

  const filtered = useMemo(() => {
    const t = search.trim().toLowerCase()
    return data.filter((u) => {
      const ms = !t || u.name.toLowerCase().includes(t) || u.email.toLowerCase().includes(t) || u.department.toLowerCase().includes(t)
      const mr = role === 'all' || u.role === role
      const mt = status === 'all' || u.status === status
      return ms && mr && mt
    })
  }, [data, search, role, status])

  const cards = [{ l: 'Total', v: summary.total }, { l: 'Active', v: summary.active }, { l: 'Pending', v: summary.pending }, { l: 'Suspended', v: summary.suspended }]

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#1e1e1e] bg-[#111] p-5">
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="mt-1 text-sm text-neutral-500">Team management and role-based access.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((c) => (
            <div key={c.l} className="rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] p-4">
              <p className="text-xs text-neutral-500">{c.l}</p>
              <h3 className="mt-1.5 text-xl font-bold text-white">{c.v}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[#1e1e1e] bg-[#111] p-5">
        <div className="grid gap-3 lg:grid-cols-4">
          <div className="lg:col-span-2"><Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, dept..." /></div>
          <Select value={role} onChange={(e) => setRole(e.target.value as RoleFilter)} options={roleOpts} />
          <Select value={status} onChange={(e) => setStatus(e.target.value as StatusFilter)} options={statusOpts} />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-neutral-500">Showing <span className="text-white">{filtered.length}</span> of <span className="text-white">{data.length}</span></p>
          <button onClick={() => { setSearch(''); setRole('all'); setStatus('all') }} className="rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] px-3 py-1.5 text-xs text-neutral-400 hover:bg-[#1a1a1a] hover:text-white transition">Clear</button>
        </div>

        <div className="mt-4">
          {isError ? <div className="rounded-lg border border-red-500/20 bg-[#0a0a0a] p-4 text-sm text-red-400">Failed to load users.</div> : <DataTable columns={columns} data={filtered} isLoading={isLoading} getRowKey={(r) => r.id} emptyMessage="No users match filters." />}
        </div>
      </div>
    </div>
  )
}

export default UsersPage