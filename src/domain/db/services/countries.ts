import type { CountryProps } from '../models/Country'
import { Country } from '../models/Country'

export const getCountries = async () => {
  const countries = await Country.all()
  return countries
}

export const getCountry = async (where: CountryProps) => {
  const country = await Country.findOne(where)
  return country
}
