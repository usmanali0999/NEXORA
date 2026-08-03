import type { ReactNode } from 'react'

export type DataTableColumn<T> = { key: keyof T; header: string; render?: (row: T) => ReactNode }

function DataTable<T>({ columns, data, isLoading = false, emptyMessage = 'No data.', getRowKey }: { columns: DataTableColumn<T>[]; data: T[]; isLoading?: boolean; emptyMessage?: string; getRowKey: (row: T) => string }) {
  if (isLoading) return <div className="overflow-hidden rounded-lg border border-[#1e1e1e]"><div className="animate-pulse space-y-2 bg-[#111] p-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-9 rounded bg-[#1a1a1a]" />)}</div></div>
  if (!data.length) return <div className="rounded-lg border border-[#1e1e1e] bg-[#111] p-5 text-xs text-neutral-500">{emptyMessage}</div>

  return (
    <div className="overflow-hidden rounded-lg border border-[#1e1e1e]">
      <table className="w-full text-left">
        <thead className="bg-[#0a0a0a] text-xs text-neutral-500">
          <tr>{columns.map((c) => <th key={String(c.key)} className="px-3 py-2.5 font-medium">{c.header}</th>)}</tr>
        </thead>
        <tbody className="bg-[#111]">
          {data.map((row) => (
            <tr key={getRowKey(row)} className="border-t border-[#1e1e1e]">
              {columns.map((c) => <td key={String(c.key)} className="px-3 py-3 text-xs text-neutral-300">{c.render ? c.render(row) : String(row[c.key])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable