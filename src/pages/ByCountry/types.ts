export interface IResult {
  id: string
  country_name: string
  total_cases: string
  new_cases: string
  active_cases: string
  total_deaths: string
  new_deaths: string
  total_recovered: string
  serious_critical: string
  region: string | null
  total_cases_per1m: string
  record_date: string
  deaths_per1m: string
  total_tests: string
  total_tests_per1m: string
  record_date_pure: string
}

export interface IState {
  isLoading: boolean
  results: IResult | null
  error: string | null
}
