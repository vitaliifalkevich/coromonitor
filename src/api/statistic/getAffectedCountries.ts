import axios from 'axios'
import config from '../../config'
import axiosConfig from './axiosConfig'
const { getUrl, URL_GET_EFFECTED_COUNTRIES } = config

const getAffectedCountries = async () =>
  await axios.get(getUrl(URL_GET_EFFECTED_COUNTRIES), axiosConfig)

export default getAffectedCountries
