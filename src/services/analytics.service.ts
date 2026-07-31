import type { AnalyticsOverview } from '../types/analytics'

const analyticsOverviewMock: AnalyticsOverview = {
  metrics: [
    {
      id: 'm1',
      label: 'Total Sessions',
      value: '48,290',
      description: 'Monthly user sessions across all channels',
    },
    {
      id: 'm2',
      label: 'Bounce Rate',
      value: '21.4%',
      description: 'Traffic quality and session retention indicator',
    },
    {
      id: 'm3',
      label: 'Avg. Session Time',
      value: '4m 18s',
      description: 'Average engagement duration per visitor',
    },
  ],
  trafficSources: [
    {
      id: 't1',
      source: 'Organic Search',
      visitors: 18240,
      percentage: 46,
    },
    {
      id: 't2',
      source: 'Direct',
      visitors: 12410,
      percentage: 31,
    },
    {
      id: 't3',
      source: 'Paid Campaigns',
      visitors: 6820,
      percentage: 17,
    },
    {
      id: 't4',
      source: 'Referrals',
      visitors: 2360,
      percentage: 6,
    },
  ],
}

export async function getAnalyticsOverview(): Promise<AnalyticsOverview> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(analyticsOverviewMock)
    }, 1000)
  })
}