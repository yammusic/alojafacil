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
} from 'sequelize-typescript'

import { BookingStatus, type BookingAttributes, type BookingCreationAttributes } from './types'
import { User } from '../User'
import { Room } from '../Room'

@Table({ tableName: 'bookings', timestamps: true })
export class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number

  @ForeignKey(() => Room)
  @Column(DataType.INTEGER)
  roomId!: number

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number

  @Column(DataType.DATE)
  checkIn!: Date

  @Column(DataType.DATE)
  checkOut!: Date

  @Column(DataType.STRING)
  guestInfo!: string

  @Column(DataType.STRING)
  emergency!: string

  @Default(BookingStatus.PENDING)
  @Column(DataType.STRING)
  status!: string

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt!: Date

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt?: Date

  @BelongsTo(() => Room)
  room!: ReturnType<() => Room>

  @BelongsTo(() => User)
  user!: ReturnType<() => User>
}
