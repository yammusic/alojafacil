import type { Optional } from 'sequelize'

export interface StateAttributes {
  id: number
  name: string
  countryId: number
  state_code: string
  createdAt?: Date
  updatedAt?: Date
}

export interface StateCreationAttributes extends Optional<StateAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
