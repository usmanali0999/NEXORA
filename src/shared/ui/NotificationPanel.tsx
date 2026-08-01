import clsx from 'clsx'
import { BellOff, X } from 'lucide-react'
import type { NotificationItem } from '../../types/notification'

type NotificationPanelProps = {
  open: boolean
  isLoading: boolean
  notifications: NotificationItem[]
  onClose: () => void
}

function NotificationPanel({
  open,
  isLoading,
  notifications,
  onClose,
}: NotificationPanelProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={clsx(
          'fixed inset-0 z-40 bg-black/40 transition-opacity',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />

      <aside
        className={clsx(
          'fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-zinc-950 shadow-2xl transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
            <p className="text-sm text-zinc-400">
              Operational alerts and workspace activity
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="h-[calc(100%-81px)] overflow-y-auto p-4">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-24 animate-pulse rounded-2xl border border-white/10 bg-zinc-900"
                />
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 text-center">
              <BellOff size={28} className="text-zinc-500" />
              <p className="mt-3 text-sm text-zinc-400">No notifications available.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((item) => {
                const badgeColor =
                  item.severity === 'success'
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : item.severity === 'warning'
                      ? 'bg-amber-500/15 text-amber-400'
                      : 'bg-blue-500/15 text-blue-400'

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-zinc-900 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-white">{item.title}</h3>
                          {item.unread && (
                            <span className="h-2 w-2 rounded-full bg-white" />
                          )}
                        </div>

                        <p className="mt-2 text-sm text-zinc-400">
                          {item.message}
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                          <span className={clsx('rounded-full px-2.5 py-1 text-xs font-medium', badgeColor)}>
                            {item.severity}
                          </span>
                          <span className="text-xs text-zinc-500">{item.timestamp}</span>
                        </div>
                      </div>
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