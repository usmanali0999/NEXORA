import type { DashboardStat } from '../types/dashboard'

const dashboardStatsMock: DashboardStat[] = [
  {
    id: 'revenue',
    title: 'Revenue',
    value: '$128,430',
    change: '+12.4%',
    trend: 'up',
  },
  {
    id: 'users',
    title: 'Active Users',
    value: '8,492',
    change: '+5.1%',
    trend: 'up',
  },
  {
    id: 'conversion',
    title: 'Conversion Rate',
    value: '12.8%',
    change: '-1.3%',
    trend: 'down',
  },
  {
    id: 'health',
    title: 'System Health',
    value: '99.94%',
    change: 'Stable',
    trend: 'stable',
  },
]

export async function getDashboardStats(): Promise<DashboardStat[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dashboardStatsMock)
    }, 800)
  })
}