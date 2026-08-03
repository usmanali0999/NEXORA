import type { SelectHTMLAttributes } from 'react'
import clsx from 'clsx'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { options: { label: string; value: string }[] }

function Select({ className, options, ...props }: SelectProps) {
  return (
    <select className={clsx('w-full rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] px-3 py-2.5 text-sm text-white outline-none focus:border-neutral-700', className)} {...props}>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

export default Select