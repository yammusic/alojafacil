import type { WhereOptions } from 'sequelize'
import { useDb } from '../../client'
import type { RoomAttributes } from './types'

type Where = WhereOptions<RoomAttributes>

export const getRooms = async (where?: Where) => {
  const { Room, Hotel } = await useDb()
  const include = [Hotel]
  const rooms = await Room.findAll({ where, include })
  return rooms
}

export const getRoom = async (where: Where) => {
  const { Room, Hotel } = await useDb()
  const include = [Hotel]
  const room = await Room.findOne({ where, include })
  return room
}
