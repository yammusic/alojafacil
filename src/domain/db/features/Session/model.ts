import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  Default,
  Unique,
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
  @Column({ type: DataType.INTEGER })
  id!: number

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId!: number

  @Unique
  @Column({ type: DataType.STRING })
  accessToken!: string

  @Default(SessionStatus.ACTIVE)
  @Column({ type: DataType.STRING })
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
