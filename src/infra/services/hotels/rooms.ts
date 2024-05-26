import axios from 'axios'

import type { RoomAttributes } from '@/domain/db/features/Room/types'

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

export interface RoomsResponse extends Response {
  content: {
    message: string
    data: RoomAttributes[]
  }
}

export interface RoomResponse extends Response {
  content: {
    message: string
    data: RoomAttributes
  }
}

export const fetchRooms = async (hotelId?: number) => {
  let url = '/api/hotels/rooms'
  if (hotelId) { url += `?hotelId=${hotelId}` }
  const { data } = await axios.get<RoomsResponse>(url)
  return data
}

export const fetchRoom = async (id: number) => {
  const url = `/api/hotels/rooms?id=${id}`
  const { data } = await axios.get<RoomResponse>(url)
  return data
}

export const createRoom = async (room: RoomAttributes) => {
  const url = '/api/hotels/rooms'
  const { data } = await axios.post<RoomResponse>(url, { room })
  return data
}

export const updateRoom = async (room: RoomAttributes) => {
  const url = '/api/hotels/rooms'
  const { data } = await axios.patch<RoomResponse>(url, { room })
  return data
}

export const deleteRoom = async (id: number) => {
  const url = '/api/hotels/rooms'
  const { data } = await axios.delete<RoomResponse>(url, { data: { id } })
  return data
}
