import type { Optional } from 'sequelize'

export enum HotelStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
  DISABLED = 'DISABLED',
}

export interface HotelAttributes {
  id?: number
  name: string
  description?: string
  address: string
  latitude: string
  longitude: string
  cityId: number
  stateId: number
  countryId: number
  postalCode: string
  picture: string
  images: string
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

export interface HotelCreationAttributes extends Optional<HotelAttributes, 'id' | 'status' | 'createdAt' | 'updatedAt'> {}
