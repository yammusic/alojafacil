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

import type { ReviewAttributes, ReviewCreationAttributes } from './types'
import { User } from '../User'
import { Hotel } from '../Hotel'

@Table({ tableName: 'reviews', timestamps: true })
export class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number

  @ForeignKey(() => Hotel)
  @Column(DataType.INTEGER)
  hotelId!: number

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number

  @Default(0)
  @Column(DataType.INTEGER)
  rating!: number

  @Column(DataType.STRING)
  comment?: string

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt!: Date

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt?: Date

  @BelongsTo(() => Hotel)
  hotel!: ReturnType<() => Hotel>

  @BelongsTo(() => User)
  user!: ReturnType<() => User>
}
