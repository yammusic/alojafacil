import type { Optional } from 'sequelize'

export interface CountryAttributes {
  id: number
  name: string
  iso3: string
  iso2: string
  numeric_code: string
  phone_code: number
  capital: string
  currency: string
  currency_name: string
  currency_symbol: string
  tld: string
  native?: string
  region: string
  subregion: string
  latitude: string
  longitude: string
  emoji: string
  createdAt?: Date
  updatedAt?: Date
}

export interface CountryCreationAttributes extends Optional<CountryAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
