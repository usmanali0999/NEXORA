export type DashboardStat = {
  id: string
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'stable'
}

export type RevenueTrendPoint = {
  label: string
  revenue: number
  users: number
}