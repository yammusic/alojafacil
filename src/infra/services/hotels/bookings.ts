import axios from 'axios'

import type { BookingAttributes } from '@/domain/db/features/Booking/types'

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

export interface BookingsResponse extends Response {
  content: {
    message: string
    data: BookingAttributes[]
  }
}

export interface BookingResponse extends Response {
  content: {
    message: string
    data: BookingAttributes
  }
}

export const fetchBookings = async (roomId?: number) => {
  let url = '/api/hotels/bookings'
  if (roomId) { url += `?roomId=${roomId}` }
  const { data } = await axios.get<BookingsResponse>(url)
  return data
}

export const fetchBooking = async (id: number) => {
  const url = `/api/hotels/bookings?id=${id}`
  const { data } = await axios.get<BookingResponse>(url)
  return data
}

export const createBooking = async (booking: BookingAttributes) => {
  const url = '/api/hotels/bookings'
  const { data } = await axios.post<BookingResponse>(url, { booking })
  return data
}

export const updateBooking = async (booking: BookingAttributes) => {
  const url = '/api/hotels/bookings'
  const { data } = await axios.patch<BookingResponse>(url, { booking })
  return data
}

export const deleteBooking = async (id: number) => {
  const url = '/api/hotels/bookings'
  const { data } = await axios.delete<BookingResponse>(url, { data: { id } })
  return data
}
