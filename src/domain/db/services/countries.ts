import type { CountryProps } from '../modelsOld/Country'
import { Country } from '../modelsOld/Country'

export const getCountries = async () => {
  const countries = await Country.all()
  return countries
}

export const getCountry = async (where: CountryProps) => {
  const country = await Country.findOne(where)
  return country
}
