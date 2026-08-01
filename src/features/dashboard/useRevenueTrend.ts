import { useQuery } from '@tanstack/react-query'
import { getRevenueTrend } from '../../services/dashboard.service'

export function useRevenueTrend() {
  return useQuery({
    queryKey: ['revenue-trend'],
    queryFn: getRevenueTrend,
  })
}