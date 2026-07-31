import { useQuery } from '@tanstack/react-query'
import { getAnalyticsOverview } from '../../services/analytics.service'

export function useAnalytics() {
  return useQuery({
    queryKey: ['analytics-overview'],
    queryFn: getAnalyticsOverview,
  })
}