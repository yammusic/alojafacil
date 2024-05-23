import type { WhereOptions } from 'sequelize'
import { useDb } from '../../client'
import type { CityAttributes } from './types'

type Where = WhereOptions<CityAttributes>

export const getCities = async (where?: Where) => {
  const { City } = await useDb()
  const cities = await City.findAll({ where })
  return cities
}

export const getCity = async (where: Where) => {
  const { City, State } = await useDb()
  const include = [State]
  const city = await City.findOne({ where, include })
  return city
}
