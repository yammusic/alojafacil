import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript'

import type { UserInfoAttributes, UserInfoCreationAttributes } from './types'
import { User } from '../User'
import { Country } from '../Country'
import { City } from '../City'

@Table({ tableName: 'user_info', timestamps: true })
export class UserInfo extends Model<UserInfoAttributes, UserInfoCreationAttributes> implements UserInfoAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number

  @ForeignKey(() => City)
  @Column(DataType.INTEGER)
  cityId?: number

  @ForeignKey(() => Country)
  @Column(DataType.INTEGER)
  countryId?: number

  @Column(DataType.STRING)
  firstName!: string

  @Column(DataType.STRING)
  lastName!: string

  @Column(DataType.STRING)
  avatar?: string

  @Column(DataType.STRING)
  gender!: string

  @Column(DataType.DATE)
  dateOfBirth!: Date

  @Column(DataType.STRING)
  phoneNumber!: string

  @Column(DataType.STRING)
  documentType!: string

  @Column(DataType.STRING)
  documentNumber!: string

  @Column(DataType.STRING)
  address?: string

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt!: Date

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt?: Date

  @BelongsTo(() => User)
  user!: ReturnType<() => User>

  @BelongsTo(() => City)
  city?: City

  @BelongsTo(() => Country)
  country?: Country
}
