import type { CityProps } from '../modelsOld/City'
import { City } from '../modelsOld/City'

export const getCities = async (where?: CityProps) => {
  const cities = await City.all(where)
  return cities
}

export const getCity = async (where: CityProps) => {
  const city = await City.findOne(where)
  return city
}
