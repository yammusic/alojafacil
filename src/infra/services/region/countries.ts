import axios from 'axios'
// import useSWR from 'swr'

import type { Country, State } from '@/domain/db'

interface Response {
  content: {
    message: string
    data: unknown[]
  }
  status: {
    code: number
    reason: string
    success: boolean
  }
}

export interface CountriesResponse extends Response {
  content: {
    message: string
    data: Country[]
  }
}

export interface StatesResponse extends Response {
  content: {
    message: string
    data: State[]
  }
}

export const fetchCountries = async () => {
  const url = '/api/region/countries'
  const { data } = await axios.get<CountriesResponse>(url)
  return data
}

// export const fetchCountriesSWR = async () => {
//   const data = useSWR('/api/region/countries', fetchCountries)
//   return data
// }

export const fetchStates = async (countryId: number) => {
  const url = `/api/region/states?countryId=${countryId}`
  const { data } = await axios.get<StatesResponse>(url)
  return data
}
