import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript'

import type { UserRoleAttributes, UserRoleCreationAttributes } from './types'
import { User } from '../User'
import { Role } from '../Role'

@Table({ tableName: 'users_roles', timestamps: false })
export class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes> implements UserRoleAttributes {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId!: number

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId!: number
}
