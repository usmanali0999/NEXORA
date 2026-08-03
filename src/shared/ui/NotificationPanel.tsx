import clsx from 'clsx'
import { BellOff, X } from 'lucide-react'
import type { NotificationItem } from '../../types/notification'

function NotificationPanel({ open, isLoading, notifications, onClose }: { open: boolean; isLoading: boolean; notifications: NotificationItem[]; onClose: () => void }) {
  return (
    <>
      <div onClick={onClose} className={clsx('fixed inset-0 z-40 bg-black/60 transition-opacity', open ? 'opacity-100' : 'pointer-events-none opacity-0')} />
      <aside className={clsx('fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l border-[#1e1e1e] bg-[#09090b] shadow-2xl transition-transform duration-300', open ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex items-center justify-between border-b border-[#1e1e1e] p-4">
          <div><h2 className="text-sm font-semibold text-white">Notifications</h2><p className="text-[11px] text-neutral-500">Alerts & activity</p></div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-neutral-500 hover:bg-[#1a1a1a] hover:text-white transition"><X size={16} /></button>
        </div>

        <div className="h-[calc(100%-65px)] overflow-y-auto p-3">
          {isLoading ? (
            <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 animate-pulse rounded-xl border border-[#1e1e1e] bg-[#111]" />)}</div>
          ) : notifications.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center"><BellOff size={24} className="text-neutral-600" /><p className="mt-2 text-xs text-neutral-500">No notifications.</p></div>
          ) : (
            <div className="space-y-2">
              {notifications.map((n) => {
                const bc = n.severity === 'success' ? 'bg-emerald-500/10 text-emerald-400' : n.severity === 'warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                return (
                  <div key={n.id} className="rounded-xl border border-[#1e1e1e] bg-[#111] p-3">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-medium text-white">{n.title}</h3>
                      {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </div>
                    <p className="mt-1.5 text-[11px] text-neutral-500">{n.message}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={clsx('rounded-full px-2 py-0.5 text-[10px] font-medium', bc)}>{n.severity}</span>
                      <span className="text-[10px] text-neutral-600">{n.timestamp}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default NotificationPanel