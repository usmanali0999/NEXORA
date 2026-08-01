import type { NotificationItem } from '../types/notification'

const notificationsMock: NotificationItem[] = [
  {
    id: 'ntf-1',
    title: 'Quarterly report generated',
    message: 'Finance summary is ready for leadership review.',
    timestamp: '2 min ago',
    unread: true,
    severity: 'success',
  },
  {
    id: 'ntf-2',
    title: 'New manager invited',
    message: 'A new workspace manager has been added to Operations.',
    timestamp: '12 min ago',
    unread: true,
    severity: 'info',
  },
  {
    id: 'ntf-3',
    title: 'Security policy updated',
    message: 'Two-factor authentication policy was revised.',
    timestamp: '1 hour ago',
    unread: false,
    severity: 'warning',
  },
  {
    id: 'ntf-4',
    title: 'Analytics sync complete',
    message: 'Traffic and engagement metrics refreshed successfully.',
    timestamp: '3 hours ago',
    unread: false,
    severity: 'success',
  },
]

export async function getNotifications(): Promise<NotificationItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(notificationsMock)
    }, 700)
  })
}