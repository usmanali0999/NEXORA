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
        <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{row.name}</p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{row.email}</p>
      </div>
    ),
  },
  {
    key: 'role',
    header: 'Role',
    render: (row) => (
      <span
        className="rounded-full px-2.5 py-1 text-xs font-medium"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--info) 15%, transparent)',
          color: 'var(--info)',
        }}
      >
        {row.role}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => {
      const color =
        row.status === 'Active'
          ? 'var(--success)'
          : row.status === 'Pending'
            ? 'var(--warning)'
            : 'var(--danger)'

      return (
        <span
          className="rounded-full px-2.5 py-1 text-xs font-medium"
          style={{
            backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
            color,
          }}
        >
          {row.status}
        </span>
      )
    },
  },
  { key: 'department', header: 'Department' },
  { key: 'lastActive', header: 'Last Active' },
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
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
      >
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Users
        </h1>
        <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
          Team management, filtering, and role-based access overview.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="rounded-xl p-5"
              style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}
            >
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {card.label}
              </p>
              <h3 className="mt-2 text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {card.value}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
      >
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
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Showing{' '}
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {filteredUsers.length}
            </span>{' '}
            of{' '}
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {data.length}
            </span>{' '}
            users
          </p>

          <button
            onClick={handleClearFilters}
            className="rounded-xl px-4 py-2 text-sm transition hover:opacity-80"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-primary)',
            }}
          >
            Clear Filters
          </button>
        </div>

        <div className="mt-6">
          {isError ? (
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--danger)', color: 'var(--danger)' }}
            >
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