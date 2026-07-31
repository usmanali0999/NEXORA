import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

type InputProps = InputHTMLAttributes<HTMLInputElement>

function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        'w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-white/20 focus:ring-2 focus:ring-white/10',
        className
      )}
      {...props}
    />
  )
}

export default Input