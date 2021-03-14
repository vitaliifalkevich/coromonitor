import axios from 'axios'
import config from '../../config'
import axiosConfig from './axiosConfig'

const getGlobalStatistic = async () =>
  await axios.get(config.URL_GET_GLOBAL_STATISTIC, axiosConfig)

export default getGlobalStatistic
