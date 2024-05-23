import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
  Default,
  Unique,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript'

import { RoleStatus, type RoleAttributes, type RoleCreationAttributes } from './types'
import { User } from '../User'
import { UserRole } from '../UserRole'

@Table({ tableName: 'roles', timestamps: true })
export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number

  @Unique
  @Column({ type: DataType.STRING })
  name!: string

  @Default(RoleStatus.ACTIVE)
  @Column({ type: DataType.STRING })
  status!: RoleStatus

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt!: Date

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt?: Date

  @BelongsToMany(() => User, () => UserRole)
  users!: User[]
}
