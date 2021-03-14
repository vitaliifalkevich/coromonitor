import config from 'config'

const axiosConfig = {
  headers: {
    'x-rapidapi-host': config.RAPID_HOST,
    'x-rapidapi-key': config.API_KEY,
  },
}

export default axiosConfig
