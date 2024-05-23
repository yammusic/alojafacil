import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript'

import type { CityAttributes, CityCreationAttributes } from './types'
import { State } from '../State'
import { Hotel } from '../Hotel'

@Table({ tableName: 'cities', timestamps: true })
export class City extends Model<CityAttributes, CityCreationAttributes> implements CityAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number

  @Column(DataType.STRING)
  name!: string

  @Column(DataType.STRING)
  latitude!: string

  @Column(DataType.STRING)
  longitude!: string

  @ForeignKey(() => State)
  @Column(DataType.INTEGER)
  stateId!: number

  @BelongsTo(() => State)
  state!: ReturnType<() => State>

  @HasMany(() => Hotel)
  hotels!: Hotel[]
}
