import type { Optional } from 'sequelize'

export interface UserInfoAttributes {
  id: number
  userId: number
  cityId?: number
  countryId?: number
  firstName: string
  lastName: string
  avatar?: string
  gender: string
  dateOfBirth: Date | string
  phoneNumber: string
  documentType: string
  documentNumber: string
  address?: string
  createdAt: Date
  updatedAt?: Date
}

export interface UserInfoCreationAttributes extends Optional<UserInfoAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
