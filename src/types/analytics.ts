export type AnalyticsMetric = {
  id: string
  label: string
  value: string
  description: string
}

export type TrafficSource = {
  id: string
  source: string
  visitors: number
  percentage: number
}

export type AnalyticsOverview = {
  metrics: AnalyticsMetric[]
  trafficSources: TrafficSource[]
}