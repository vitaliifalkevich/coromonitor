export interface ICountry {
  name: string
  isChosen: boolean
}

export interface IState {
  countries: {
    isLoading: boolean
    data: ICountry[]
    error: null | string
  }
  currentPage: number
}
