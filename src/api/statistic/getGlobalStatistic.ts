import axios from 'axios'
import config from '../../config'
import axiosConfig from './axiosConfig'
const { getUrl, URL_GET_GLOBAL_STATISTIC } = config

export const getGlobalStatistic = async () =>
  await axios.get(getUrl(URL_GET_GLOBAL_STATISTIC), axiosConfig)
