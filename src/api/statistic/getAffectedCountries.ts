import axios from 'axios'
import config from '../../config'
import axiosConfig from './axiosConfig'

const getAffectedCountries = async () =>
  await axios.get(config.URL_GET_EFFECTED_COUNTRIES, axiosConfig)

export default getAffectedCountries
