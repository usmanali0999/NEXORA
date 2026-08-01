import clsx from 'clsx'

type SwitchProps = {
  checked: boolean
  onChange: (checked: boolean) => void
}

function Switch({ checked, onChange }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={clsx(
        'relative inline-flex h-7 w-12 items-center rounded-full transition',
        checked ? 'bg-white' : 'bg-zinc-700'
      )}
    >
      <span
        className={clsx(
          'inline-block h-5 w-5 transform rounded-full bg-zinc-950 transition',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  )
}

export default Switch