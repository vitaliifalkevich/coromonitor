import axios from 'axios'
import config from 'config'
import axiosConfig from './axiosConfig'
const { getUrl, URL_GET_STATISTIC_BY_COUNTRY } = config

const getStatisticByCountry = async (countryName: string) =>
  await axios.get(
    getUrl(`${URL_GET_STATISTIC_BY_COUNTRY}?country=${countryName}`),
    axiosConfig,
  )

export default getStatisticByCountry
