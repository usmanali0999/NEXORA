import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx('w-full rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] px-3 py-2.5 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-neutral-700', className)}
      {...props}
    />
  )
}

export default Input