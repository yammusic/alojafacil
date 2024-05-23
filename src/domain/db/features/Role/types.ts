import type { Optional } from 'sequelize'

export enum RoleStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
  DELETED = 'DELETED',
}

export interface RoleAttributes {
  id: number
  name: string
  status: RoleStatus
  createdAt: Date
  updatedAt?: Date
}

export interface RoleCreationAttributes extends Optional<RoleAttributes, 'id' | 'status' | 'createdAt' | 'updatedAt'> {}
