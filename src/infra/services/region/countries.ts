import axios from 'axios'

import type { CountryAttributes } from '@/domain/db/features/Country/types'

interface Response {
  content: {
    message: string
    data: any
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
    data: CountryAttributes[]
  }
}

export interface CountryResponse extends Response {
  content: {
    message: string
    data: CountryAttributes
  }
}

export const fetchCountries = async () => {
  const url = '/api/region/countries'
  const { data } = await axios.get<CountriesResponse>(url)
  return data
}

export const fetchCountry = async (id: number) => {
  const url = `/api/region/countries?id=${id}`
  const { data } = await axios.get<CountryAttributes>(url)
  return data
}

export const createCountry = async (country: CountryAttributes) => {
  const url = '/api/region/countries'
  const { data } = await axios.post<CountryResponse>(url, { country })
  return data
}

export const updateCountry = async (country: CountryAttributes) => {
  const url = '/api/region/countries'
  const { data } = await axios.patch<CountryResponse>(url, { country })
  return data
}

export const deleteCountry = async (id: number) => {
  const url = '/api/region/countries'
  const { data } = await axios.delete<CountryResponse>(url, { data: { id } })
  return data
}
