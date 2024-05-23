import type { HotelProps } from '../modelsOld/Hotel'
import { Hotel } from '../modelsOld/Hotel'

export const getHotels = async () => {
  const hotels = await Hotel.all()
  return hotels
}

export const getHotel = async (where: HotelProps) => {
  const hotel = await Hotel.findOne(where)
  return hotel
}
