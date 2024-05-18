import type { CityProps } from '../models/City'
import { City } from '../models/City'

export const getCities = async (where?: CityProps) => {
  const cities = await City.all(where)
  return cities
}

export const getCity = async (where: CityProps) => {
  const city = await City.findOne(where)
  return city
}
