import { useMemo, useState } from 'react'
import DataTable, { type DataTableColumn } from '../../shared/ui/DataTable'
import Input from '../../shared/ui/Input'
import Select from '../../shared/ui/Select'
import { useUsers } from './useUsers'
import type { UserRecord, UserStatus } from '../../types/user'

type RoleFilter = 'all' | UserRecord['role']
type StatusFilter = 'all' | UserStatus

const roleOptions = [
  { label: 'All Roles', value: 'all' },
  { label: 'Admin', value: 'Admin' },
  { label: 'Manager', value: 'Manager' },
  { label: 'Analyst', value: 'Analyst' },
]

const statusOptions = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Active', value: 'Active' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Suspended', value: 'Suspended' },
]

const columns: DataTableColumn<UserRecord>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (row) => (
      <div>
        <p className="font-medium text-white">{row.name}</p>
        <p className="text-xs text-zinc-400">{row.email}</p>
      </div>
    ),
  },
  {
    key: 'role',
    header: 'Role',
    render: (row) => (
      <span className="rounded-full bg-blue-500/15 px-2.5 py-1 text-xs font-medium text-blue-400">
        {row.role}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => {
      const styles =
        row.status === 'Active'
          ? 'bg-emerald-500/15 text-emerald-400'
          : row.status === 'Pending'
            ? 'bg-amber-500/15 text-amber-400'
            : 'bg-red-500/15 text-red-400'

      return (
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles}`}>
          {row.status}
        </span>
      )
    },
  },
  {
    key: 'department',
    header: 'Department',
  },
  {
    key: 'lastActive',
    header: 'Last Active',
  },
]

function UsersPage() {
  const { data = [], isLoading, isError } = useUsers()

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const summary = useMemo(() => {
    return {
      total: data.length,
      active: data.filter((user) => user.status === 'Active').length,
      pending: data.filter((user) => user.status === 'Pending').length,
      suspended: data.filter((user) => user.status === 'Suspended').length,
    }
  }, [data])

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase()

    return data.filter((user) => {
      const matchesSearch =
        !term ||
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.department.toLowerCase().includes(term)

      const matchesRole = roleFilter === 'all' || user.role === roleFilter
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [data, search, roleFilter, statusFilter])

  const handleClearFilters = () => {
    setSearch('')
    setRoleFilter('all')
    setStatusFilter('all')
  }

  const summaryCards = [
    { label: 'Total Users', value: summary.total },
    { label: 'Active', value: summary.active },
    { label: 'Pending', value: summary.pending },
    { label: 'Suspended', value: summary.suspended },
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="mt-2 text-zinc-400">
          Team management, filtering, and role-based access overview.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-white/10 bg-zinc-950 p-5"
            >
              <p className="text-sm text-zinc-400">{card.label}</p>
              <h3 className="mt-2 text-2xl font-bold text-white">{card.value}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
        <div className="grid gap-4 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or department..."
            />
          </div>

          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
            options={roleOptions}
          />

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            options={statusOptions}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-zinc-400">
            Showing <span className="font-medium text-white">{filteredUsers.length}</span> of{' '}
            <span className="font-medium text-white">{data.length}</span> users
          </p>

          <button
            onClick={handleClearFilters}
            className="rounded-xl border border-white/10 bg-zinc-950 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            Clear Filters
          </button>
        </div>

        <div className="mt-6">
          {isError ? (
            <div className="rounded-xl border border-red-500/20 bg-zinc-950 p-5 text-red-400">
              Failed to load users data.
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredUsers}
              isLoading={isLoading}
              getRowKey={(row) => row.id}
              emptyMessage="No users match the current filters."
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default UsersPage