export interface ICountry {
  name: string
  isChosen: boolean
}

export interface IState {
  countries: {
    isLoading: boolean
    data: ICountry[]
    errors: string[] | string
  }
  countChosenCountries: number
  currentPage: number
}
