import type { DashboardStat, RevenueTrendPoint } from '../types/dashboard'

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

const revenueTrendMock: RevenueTrendPoint[] = [
  { label: 'Jan', revenue: 18000, users: 4200 },
  { label: 'Feb', revenue: 22000, users: 5100 },
  { label: 'Mar', revenue: 26000, users: 5900 },
  { label: 'Apr', revenue: 24000, users: 5600 },
  { label: 'May', revenue: 31000, users: 7000 },
  { label: 'Jun', revenue: 35400, users: 8492 },
]

export async function getDashboardStats(): Promise<DashboardStat[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dashboardStatsMock)
    }, 800)
  })
}

export async function getRevenueTrend(): Promise<RevenueTrendPoint[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(revenueTrendMock)
    }, 900)
  })
}