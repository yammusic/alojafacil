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
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript'

import { RoomStatus, type RoomAttributes, type RoomCreationAttributes } from './types'
import { Booking } from '../Booking'
import { Hotel } from '../Hotel'

@Table({ tableName: 'rooms', timestamps: true })
export class Room extends Model<RoomAttributes, RoomCreationAttributes> implements RoomAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @ForeignKey(() => Hotel)
  @Column(DataType.INTEGER)
  hotelId!: number

  @Column(DataType.STRING)
  type!: string

  @Column(DataType.TEXT)
  description?: string

  @Column(DataType.FLOAT)
  basePrice!: number

  @Column(DataType.FLOAT)
  taxes!: number

  @Column(DataType.FLOAT)
  discount?: number

  @Column(DataType.STRING)
  location!: string

  @Column(DataType.TEXT)
  picture!: string

  @Column(DataType.TEXT)
  images!: string

  @Default(true)
  @Column(DataType.BOOLEAN)
  available!: boolean

  @Default(1)
  @Column(DataType.INTEGER)
  beds!: number

  @Default(1)
  @Column(DataType.INTEGER)
  bathrooms!: number

  @Default(1)
  @Column(DataType.INTEGER)
  capacity!: number

  @Column(DataType.TEXT)
  amenities?: string

  @Column(DataType.TEXT)
  features?: string

  @Column(DataType.TEXT)
  payments?: string

  @Default(RoomStatus.ACTIVE)
  @Column(DataType.STRING)
  status!: RoomStatus

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt!: Date

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt?: Date

  @BelongsTo(() => Hotel)
  hotel!: ReturnType<() => Hotel>

  @HasMany(() => Booking)
  bookings!: Booking[]
}
