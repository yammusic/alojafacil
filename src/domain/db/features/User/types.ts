import type { Optional } from 'sequelize'

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
  DELETED = 'DELETED',
  DISABLED = 'DISABLED',
}

export interface UserAttributes {
  id: number
  username: string
  email: string
  password: string
  secretKey: string
  status?: UserStatus
  createdAt?: Date
  updatedAt?: Date
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'status' | 'createdAt' | 'updatedAt'> {}




// export interface UserProps {
//   id?: number
//   username?: string
//   email?: string
//   password?: string
//   secretKey?: string
//   status?: UserStatus
// }
