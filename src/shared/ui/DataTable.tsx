import type { ReactNode } from 'react'

export type DataTableColumn<T> = {
  key: keyof T
  header: string
  render?: (row: T) => ReactNode
}

type DataTableProps<T> = {
  columns: DataTableColumn<T>[]
  data: T[]
  isLoading?: boolean
  emptyMessage?: string
  getRowKey: (row: T) => string
}

function DataTable<T>({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'No data found.',
  getRowKey,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="animate-pulse space-y-3 bg-zinc-900 p-4">
          <div className="h-10 rounded bg-zinc-800" />
          <div className="h-10 rounded bg-zinc-800" />
          <div className="h-10 rounded bg-zinc-800" />
          <div className="h-10 rounded bg-zinc-800" />
        </div>
      </div>
    )
  }

  if (!data.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-zinc-900 p-6 text-sm text-zinc-400">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <table className="w-full text-left">
        <thead className="bg-zinc-950 text-sm text-zinc-400">
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} className="px-4 py-3 font-medium">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-zinc-900">
          {data.map((row) => (
            <tr key={getRowKey(row)} className="border-t border-white/10">
              {columns.map((column) => (
                <td key={String(column.key)} className="px-4 py-4 text-sm text-zinc-200">
                  {column.render ? column.render(row) : String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable