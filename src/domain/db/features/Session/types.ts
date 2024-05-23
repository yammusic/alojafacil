import type { Optional } from 'sequelize'

export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
  DELETED = 'DELETED',
  DISABLED = 'DISABLED',
  EXPIRED = 'EXPIRED',
}

export interface SessionAttributes {
  id?: number
  accessToken: string
  status?: SessionStatus
  userId: number
  createdAt?: Date
  updatedAt?: Date
}

export interface SessionCreationAttributes extends Optional<SessionAttributes, 'id' | 'status' | 'createdAt' | 'updatedAt'> {}
