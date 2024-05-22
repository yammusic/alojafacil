/* eslint-disable react-hooks/rules-of-hooks */
import { useTurso } from '../client'
import type { City } from './City'
import type { Country } from './Country'

export type StateProps = {
  id?: number
  countryId?: number
  name?: string
  state_code?: string
}

export class State {
  id: number = 0
  countryId: number = 0
  name: string = ''
  state_code: string = ''
  country: Country | null = null
  cities: City[] | null = null

  constructor(props: StateProps) {
    Object.assign(this, props)
  }

  static async create(props: StateProps) {
    const db = useTurso()

    try {
      const state = await db.state.create({ data: props as any })
      return new State(state as StateProps)
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  static async all(where: StateProps = {}) {
    const db = useTurso()
    const include = { country: true, cities: true }

    try {
      const states = await db.state.findMany({ where, include })
      return states.map((state) => new State(state as StateProps))
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  static async findOne(where: StateProps) {
    const db = useTurso()
    const include = { country: true, cities: true }

    try {
      const state = await db.state.findFirst({ where, include })
      if (!state) return null
      return new State(state as StateProps)
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  save() {
    const db = useTurso()

    return db.state.upsert({
      where: { id: this.id },
      create: this as any,
      update: this as any,
    })
  }
}
