import axios from 'axios'

import type { HotelAttributes } from '@/domain/db/features/Hotel/types'

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

export interface HotelsResponse extends Response {
  content: {
    message: string
    data: HotelAttributes[]
  }
}

export interface HotelResponse extends Response {
  content: {
    message: string
    data: HotelAttributes
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

export const createHotel = async (hotel: HotelAttributes) => {
  const url = '/api/hotels'
  const { data } = await axios.post<HotelResponse>(url, { hotel })
  return data
}

export const updateHotel = async (hotel: HotelAttributes) => {
  const url = '/api/hotels'
  const { data } = await axios.patch<HotelResponse>(url, { hotel })
  return data
}

export const deleteHotel = async (id: number) => {
  const url = '/api/hotels'
  const { data } = await axios.delete<HotelResponse>(url, { data: { id } })
  return data
}
