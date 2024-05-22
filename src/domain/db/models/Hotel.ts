/* eslint-disable react-hooks/rules-of-hooks */
import { useTurso } from '../client'
import type { City } from './City'
import type { Country } from './Country'
import type { State } from './State'

export enum HotelStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
  DISABLED = 'DISABLED',
}

export type HotelProps = {
  id?: number
  name?: string
  description?: string
  address?: string
  latitude?: string
  longitude?: string
  cityId?: number
  stateId?: number
  countryId?: number
  postalCode?: string
  picture?: string
  images?: string
  available?: boolean
  rating?: number
  amenities?: string
  policies?: string
  features?: string
  payments?: string
  status?: HotelStatus
  createdAt?: Date
  updatedAt?: Date
}

export class Hotel {
  id: number = 0
  name: string = ''
  description: string = ''
  address: string = ''
  latitude: string = ''
  longitude: string = ''
  cityId: number = 0
  stateId: number = 0
  countryId: number = 0
  postalCode: string = ''
  picture: string = ''
  images: string = ''
  available: boolean = true
  rating: number = 0
  amenities: string = ''
  policies: string = ''
  features: string = ''
  payments: string = ''
  status: HotelStatus = HotelStatus.ACTIVE
  createdAt: Date = new Date()
  updatedAt: Date = new Date()

  city: City | null = null
  state: State | null = null
  country: Country | null = null
  // rooms: Room[] = []
  // reviews: Review[] = []

  constructor(data: HotelProps) {
    Object.assign(this, data)
  }

  static async create(data: HotelProps) {
    const db = useTurso()

    try {
      const hotel = await db.hotel.create({ data: data as any })
      return new Hotel(hotel as HotelProps)
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  static async all() {
    const db = useTurso()

    const include: HotelInclude = {
      city: true,
      state: true,
      country: true,
    }

    try {
      const countries = await db.hotel.findMany({ include })
      return countries.map((hotel) => new Hotel(hotel as HotelProps))
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  static async findOne(where: HotelProps) {
    const db = useTurso()

    const include: HotelInclude = {
      city: true,
      state: true,
      country: true,
    }

    try {
      const hotel = await db.hotel.findFirst({ where, include })
      if (!hotel) return null
      return new Hotel(hotel as HotelProps)
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  async save() {
    const db = useTurso()

    return db.hotel.upsert({
      where: { id: this.id },
      create: this as any,
      update: this as any,
    })
  }
}

export interface HotelInclude {
  city?: boolean
  state?: boolean
  country?: boolean
  rooms?: boolean
  reviews?: boolean
}
