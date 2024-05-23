import type { WhereOptions } from 'sequelize'
import { useDb } from '../../client'
import type { CountryAttributes } from './types'

type Where = WhereOptions<CountryAttributes>

export const getCountries = async (where?: Where) => {
  const { Country } = await useDb()
  const countries = await Country.findAll({ where })
  return countries
}

export const getCountry = async (where: Where) => {
  const { Country, State } = await useDb()
  const include = [State]
  const country = await Country.findOne({ where, include })
  return country
}
