import axios from 'axios'
import type { Country, State } from '@/domain/db'

export interface CountriesResponse {
  content: {
    message: string
    data: Country[]
  }
  statu: {
    code: number
    reason: string
    success: boolean
  }
}

export interface StatesResponse {
  content: {
    message: string
    data: State[]
  }
  statu: {
    code: number
    reason: string
    success: boolean
  }
}

export const fetchCountries = async () => {
  const url = '/api/region/countries'
  const { data } = await axios.get<CountriesResponse>(url)
  return data
}

export const fetchStates = async (countryId: number) => {
  const url = `/api/region/states?countryId=${countryId}`
  const { data } = await axios.get<StatesResponse>(url)
  return data
}
