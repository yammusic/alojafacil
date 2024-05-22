/* eslint-disable react-hooks/rules-of-hooks */
import { useTurso } from '../client'
import type { State } from './State'

export type CountryProps = {
  id?: number
  name?: string
  iso3?: string
  iso2?: string
  numeric_code?: string
  phone_code?: number
  capital?: string
  currency?: string
  currency_name?: string
  currency_symbol?: string
  tld?: string
  native?: string
  region?: string
  subregion?: string
  latitude?: string
  longitude?: string
  emoji?: string
}

export class Country {
  id: number = 0
  name: string = ''
  iso3: string = ''
  iso2: string = ''
  numeric_code: string = ''
  phone_code: number = 0
  capital: string = ''
  currency: string = ''
  currency_name: string = ''
  currency_symbol: string = ''
  tld: string = ''
  native: string = ''
  region: string = ''
  subregion: string = ''
  latitude: string = ''
  longitude: string = ''
  emoji: string = ''
  states: State[] = []

  constructor(props: CountryProps) {
    Object.assign(this, props)
  }

  static async create(props: CountryProps) {
    const db = useTurso()

    try {
      const country = await db.country.create({ data: props as any })
      return new Country(country as CountryProps)
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  static async all() {
    const db = useTurso()

    try {
      const countries = await db.country.findMany()
      return countries.map((country) => new Country(country as CountryProps))
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  static async findOne(where: CountryProps) {
    const db = useTurso()

    try {
      const country = await db.country.findFirst({ where })
      if (!country) return null
      return new Country(country as CountryProps)
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  save() {
    const db = useTurso()

    return db.country.upsert({
      where: { id: this.id },
      create: this,
      update: this,
    })
  }
}
