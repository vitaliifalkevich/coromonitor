export interface IGlobalResult {
  total_cases: string
  new_cases: string
  total_deaths: string
  new_deaths: string
  total_recovered: string
  active_cases: string
  serious_critical: string
  total_cases_per_1m_population: string
  deaths_per_1m_population: string
  statistic_taken_at: string
}

export interface IState {
  isLoading: boolean
  results: IGlobalResult | null
  error: string | null
}
