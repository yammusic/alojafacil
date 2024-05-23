import type { Optional } from 'sequelize'

export enum RoomStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
  DISABLED = 'DISABLED',
}

export interface RoomAttributes {
  id?: number
  hotelId: number
  type: string
  description?: string
  basePrice: number
  taxes: number
  discount?: number
  location: string
  picture: string
  images: string
  available?: boolean
  beds?: number
  bathrooms?: number
  capacity?: number
  amenities?: string
  features?: string
  payments?: string
  status?: RoomStatus
  createdAt?: Date
  updatedAt?: Date
}

export interface RoomCreationAttributes extends Optional<RoomAttributes, 'id' | 'status' | 'createdAt' | 'updatedAt'> {}
