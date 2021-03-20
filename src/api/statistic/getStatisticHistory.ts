import axios from 'axios'
import config from 'config'
import axiosConfig from './axiosConfig'
const { getUrl, URL_GET_STATISTIC_HISTORY } = config

const getStatisticHistory = async (countryName: string) =>
  await axios.get(
    getUrl(`${URL_GET_STATISTIC_HISTORY}?country=${countryName}`),
    axiosConfig,
  )

export default getStatisticHistory
