import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  Default,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript'

import { HotelStatus, type HotelAttributes, type HotelCreationAttributes } from './types'
import { City } from '../City'
import { Room } from '../Room'
import { Country } from '../Country'
import { State } from '../State'
import { Review } from '../Review'

@Table({ tableName: 'hotels', timestamps: true })
export class Hotel extends Model<HotelAttributes, HotelCreationAttributes> implements HotelAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number

  @Column(DataType.STRING)
  name!: string

  @Column(DataType.STRING)
  description?: string

  @Column(DataType.STRING)
  address!: string

  @Column(DataType.STRING)
  latitude!: string

  @Column(DataType.STRING)
  longitude!: string

  @ForeignKey(() => City)
  @Column(DataType.INTEGER)
  cityId!: number

  @ForeignKey(() => State)
  @Column(DataType.INTEGER)
  stateId!: number

  @ForeignKey(() => Country)
  @Column(DataType.INTEGER)
  countryId!: number

  @Column(DataType.STRING)
  postalCode!: string

  @Column(DataType.STRING)
  picture!: string

  @Column(DataType.STRING)
  images!: string

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  available!: boolean

  @Column(DataType.FLOAT)
  rating?: number

  @Column(DataType.STRING)
  amenities?: string

  @Column(DataType.STRING)
  policies?: string

  @Column(DataType.STRING)
  features?: string

  @Column(DataType.STRING)
  payments?: string

  @Default(HotelStatus.ACTIVE)
  @Column(DataType.STRING)
  status!: HotelStatus

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt!: Date

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt?: Date

  @BelongsTo(() => City)
  city!: ReturnType<() => City>

  @BelongsTo(() => State)
  state!: ReturnType<() => State>

  @BelongsTo(() => Country)
  country!: ReturnType<() => Country>

  @HasMany(() => Room)
  rooms!: Room[]

  @HasMany(() => Review)
  reviews!: Review[]
}
