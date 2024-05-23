import type { Optional } from 'sequelize'

export enum BookingStatus {
  ACTIVE = 'ACTIVE',
  TERMINATED = 'TERMINATED',
  DELETED = 'DELETED',
  PENDING = 'PENDING',
  BOOKED = 'BOOKED',
  EXPIRED = 'EXPIRED',
}

export interface BookingAttributes {
  id?: number
  roomId: number
  userId: number
  checkIn: Date
  checkOut: Date
  guestInfo: string
  emergency: string
  status?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface BookingCreationAttributes extends Optional<BookingAttributes, 'id' | 'status' | 'createdAt' | 'updatedAt'> {}
