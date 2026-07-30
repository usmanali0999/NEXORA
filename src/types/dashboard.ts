export type DashboardStat = {
  id: string
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'stable'
}