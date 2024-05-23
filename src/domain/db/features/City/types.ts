import type { Optional } from 'sequelize'

export interface CityAttributes {
  id: number
  name: string
  latitude: string
  longitude: string
  stateId: number
  createdAt?: Date
  updatedAt?: Date
}

export interface CityCreationAttributes extends Optional<CityAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
