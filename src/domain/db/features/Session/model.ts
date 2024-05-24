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

import { SessionStatus, type SessionAttributes, type SessionCreationAttributes } from './types'
import { User } from '../User'

@Table({ tableName: 'sessions', timestamps: true })
export class Session extends Model<SessionAttributes, SessionCreationAttributes> implements SessionAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number

  @Column(DataType.TEXT)
  accessToken!: string

  @Default(SessionStatus.ACTIVE)
  @Column(DataType.STRING)
  status!: SessionStatus

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt!: Date

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt?: Date

  @BelongsTo(() => User)
  user!: ReturnType<() => User>
}
