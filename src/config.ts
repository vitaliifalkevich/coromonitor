const BASE_URL = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/'

const config = {
  getUrl: (url: string) => BASE_URL + url,
  API_KEY: '2e26761eacmsha0de99974e9b625p1c649cjsn5df2e645c30d',
  RAPID_HOST: 'coronavirus-monitor.p.rapidapi.com',
  URL_GET_GLOBAL_STATISTIC: 'worldstat.php',
  URL_GET_STATISTIC_BY_COUNTRY: 'latest_stat_by_country.php',
  URL_GET_EFFECTED_COUNTRIES: 'affected.php',
  URL_GET_STATISTIC_HISTORY: 'cases_by_particular_country.php',
  ONE_MONTH: 'one_month',
  LIMIT_REQUEST_TIME: 300,
  BASE_DIRECTORY: 'coromonitor',
  chosenCountriesFileName: 'chosenCountries',
}

export default config
