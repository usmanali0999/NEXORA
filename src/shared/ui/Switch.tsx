import clsx from 'clsx'

function Switch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className={clsx('relative inline-flex h-6 w-10 items-center rounded-full transition', checked ? 'bg-white' : 'bg-neutral-700')}>
      <span className={clsx('inline-block h-4 w-4 rounded-full bg-[#09090b] transition', checked ? 'translate-x-5' : 'translate-x-1')} />
    </button>
  )
}

export default Switch