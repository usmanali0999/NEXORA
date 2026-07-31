import type { SelectHTMLAttributes } from 'react'
import clsx from 'clsx'

type SelectOption = {
  label: string
  value: string
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[]
}

function Select({ className, options, ...props }: SelectProps) {
  return (
    <select
      className={clsx(
        'w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10',
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select