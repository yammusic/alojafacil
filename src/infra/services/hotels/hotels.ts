import axios from 'axios'

import type { Country, Hotel } from '@/domain/db'

interface Response {
  content: {
    message: string
    data: unknown[] | unknown
  }
  status: {
    code: number
    reason: string
    success: boolean
  }
}

export interface HotelsResponse extends Response {
  content: {
    message: string
    data: Country[]
  }
}

export interface HotelResponse extends Response {
  content: {
    message: string
    data: Hotel
  }
}

export const fetchHotels = async () => {
  const url = '/api/hotels'
  const { data } = await axios.get<HotelsResponse>(url)
  return data
}

export const fetchHotel = async (id: number) => {
  const url = `/api/hotels?id=${id}`
  const { data } = await axios.get<HotelResponse>(url)
  return data
}

// export const fetchHotelsSWR = async () => {
//   const data = useSWR('/api/hotels', fetchHotels)
//   return data
// }
