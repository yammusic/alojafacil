import axios from 'axios'

import type { CityAttributes } from '@/domain/db/features/City/types'

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

export interface CitiesResponse extends Response {
  content: {
    message: string
    data: CityAttributes[]
  }
}

export interface CityResponse extends Response {
  content: {
    message: string
    data: CityAttributes
  }
}

export const fetchCities = async (stateId: number) => {
  const url = `/api/region/cities?stateId=${stateId}`
  const { data } = await axios.get<CitiesResponse>(url)
  return data
}

export const fetchCity = async (id: number) => {
  const url = `/api/region/cities?id=${id}`
  const { data } = await axios.get<CityAttributes>(url)
  return data
}

export const createCity = async (city: CityAttributes) => {
  const url = '/api/region/cities'
  const { data } = await axios.post<CityResponse>(url, { city })
  return data
}

export const updateCity = async (city: CityAttributes) => {
  const url = '/api/region/cities'
  const { data } = await axios.patch<CityResponse>(url, { city })
  return data
}

export const deleteCity = async (id: number) => {
  const url = '/api/region/cities'
  const { data } = await axios.delete<CityResponse>(url, { data: { id } })
  return data
}
