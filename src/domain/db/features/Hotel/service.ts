import type { WhereOptions } from 'sequelize'
import { useDb } from '../../client'
import type { HotelAttributes } from './types'

type Where = WhereOptions<HotelAttributes>

export const getHotels = async (where?: Where) => {
  const { Hotel, Review } = await useDb()
  const include = [Review]
  const hotels = await Hotel.findAll({ where, include })
  return hotels
}

export const getHotel = async (where: Where) => {
  const { Hotel, Review, Room } = await useDb()
  const include = [Review, Room]
  const hotel = await Hotel.findOne({ where, include })
  return hotel
}
