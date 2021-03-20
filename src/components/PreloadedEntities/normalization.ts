import { ICountry } from './types'

export const prepareCountries = (countries: string[]): ICountry[] => {
  return countries.map(country => ({
    name: country,
    isChosen: false,
  }))
}
