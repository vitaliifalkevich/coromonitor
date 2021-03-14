import axios from 'axios'
import config from 'config'
import axiosConfig from './axiosConfig'

const getStatisticHistory = async (countryName: string) =>
  await axios.get(
    `${config.URL_GET_STATISTIC_HISTORY}?country=${countryName}`,
    axiosConfig,
  )

export default getStatisticHistory
