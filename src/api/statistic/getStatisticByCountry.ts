import axios from 'axios'
import config from 'config'
import axiosConfig from './axiosConfig'

const getStatisticByCountry = async (countryName: string) =>
  await axios.get(
    `${config.URL_GET_STATISTIC_BY_COUNTRY}?country=${countryName}`,
    axiosConfig,
  )

export default getStatisticByCountry
