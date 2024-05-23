import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript'

import type { StateAttributes, StateCreationAttributes } from './types'
import { Country } from '../Country'
import { City } from '../City'
import { Hotel } from '../Hotel'

@Table({ tableName: 'states', timestamps: true })
export class State extends Model<StateAttributes, StateCreationAttributes> implements StateAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @ForeignKey(() => Country)
  @Column(DataType.INTEGER)
  countryId!: number

  @Column(DataType.STRING)
  name!: string

  @Column(DataType.STRING)
  state_code!: string

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt!: Date

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt?: Date

  @BelongsTo(() => Country)
  country!: ReturnType<() => Country>

  @HasMany(() => City)
  cities!: City[]

  @HasMany(() => Hotel)
  hotels!: Hotel[]
}
