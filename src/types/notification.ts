export type NotificationSeverity = 'info' | 'success' | 'warning'

export type NotificationItem = {
  id: string
  title: string
  message: string
  timestamp: string
  unread: boolean
  severity: NotificationSeverity
}