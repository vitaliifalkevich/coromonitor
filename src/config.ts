const BASE_URL = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/'

const config = {
  getUrl: (url: string) => BASE_URL + url,
  API_KEY: process.env.REACT_APP_API_KEY,
  RAPID_HOST: 'coronavirus-monitor.p.rapidapi.com',
  URL_GET_GLOBAL_STATISTIC: 'worldstat.php',
  URL_GET_STATISTIC_BY_COUNTRY: 'latest_stat_by_country.php',
  URL_GET_EFFECTED_COUNTRIES: 'affected.php',
  URL_GET_STATISTIC_HISTORY: 'cases_by_particular_country.php',
  ONE_MONTH: 'one_month',
  LIMIT_REQUEST_TIME: 300,
  BASE_DIRECTORY: 'coromonitor',
  chosenCountriesFileName: 'chosenCountries',
  paymentSuccessStatus: 'Success',
  paymentSuccessDescription: 'Your subscription is active',
}

export default config
