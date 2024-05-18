/* eslint-disable react-hooks/rules-of-hooks */
import { useTurso } from '../client'
import type { State } from './State'

export type CityProps = {
  id?: number
  stateId?: number
  name?: string
  latitude?: string
  longitude?: string
}

export class City {
  id: number = 0
  stateId: number = 0
  name: string = ''
  latitude: string = ''
  longitude: string = ''
  state: State | null = null

  constructor(props: CityProps) {
    Object.assign(this, props)
  }

  static async create(props: CityProps) {
    const db = useTurso()

    try {
      const city = await db.city.create({ data: props })
      return new City(city as CityProps)
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  static async all(where: CityProps = {}) {
    const db = useTurso()

    try {
      const cities = await db.city.findMany({ where })
      return cities.map((city) => new City(city as CityProps))
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  static async findOne(where: CityProps) {
    const db = useTurso()

    try {
      const city = await db.city.findFirst({ where })
      if (!city) return null
      return new City(city as CityProps)
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  save() {
    const db = useTurso()

    return db.city.upsert({
      where: { id: this.id },
      create: this as any,
      update: this as any,
    })
  }
}
