import type { HotelProps } from '../models/Hotel'
import { Hotel } from '../models/Hotel'

export const getHotels = async () => {
  const hotels = await Hotel.all()
  return hotels
}

export const getHotel = async (where: HotelProps) => {
  const hotel = await Hotel.findOne(where)
  return hotel
}
