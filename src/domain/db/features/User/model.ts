import {
  Table,
  Column,
  Model,
  DataType,
  HasOne,
  HasMany,
  Default,
  AutoIncrement,
  PrimaryKey,
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript'
import { DateTime } from 'luxon'

import { SECRET_KEY } from '@/domain/constants'
import { decodeJWT, hashPassword, signJWT } from '@/domain/utils'
import { UserStatus, type UserAttributes, type UserCreationAttributes } from './types'
import { Session, SessionStatus, type SessionAttributes } from '../Session'
import { Role } from '../Role'
import { UserInfo } from '../UserInfo'
import { UserRole } from '../UserRole'
import { Booking } from '../Booking'
import { Review } from '../Review'

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number

  @Column(DataType.STRING)
  username!: string

  @Column(DataType.STRING)
  email!: string

  @Column(DataType.STRING)
  password!: string

  @Column(DataType.STRING)
  secretKey!: string

  @Default(UserStatus.ACTIVE)
  @Column(DataType.STRING)
  status!: UserStatus

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt!: Date

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt?: Date

  @HasOne(() => UserInfo)
  info?: ReturnType<() => UserInfo>

  @BelongsToMany(() => Role, () => UserRole)
  roles!: Role[]

  @HasMany(() => Session)
  sessions!: Session[]

  @HasMany(() => Booking)
  bookings!: Booking[]

  @HasMany(() => Review)
  reviews!: Review[]

  hasSamePassword(password: string) {
    return this.password === hashPassword(password)
  }

  // Sessions
  async getAccessToken() {
    const secretKey = this.secretKey ?? SECRET_KEY
    const activeSessions = this.sessions.filter((s: any) => s.status === SessionStatus.ACTIVE)
    let activeToken

    for (const s of activeSessions) {
      const { expiredAt } = await decodeJWT(s.accessToken, secretKey)
      const session = new Session(s as SessionAttributes)

      if (Number(expiredAt) < DateTime.now().toMillis()) {
        session.status = SessionStatus.EXPIRED
        session.save()
      } else {
        activeToken = {
          accessToken: session.accessToken,
          expiredAt,
        }
        break
      }
    }

    return activeToken
  }

  async sign() {
    const secretKey = this.secretKey ?? SECRET_KEY
    const { accessToken, expiredAt } = await this.getAccessToken() ?? {}

    if (!accessToken) {
      const expire = DateTime.now().plus({ 'days': 7 })
      const token = await signJWT({
        expiredAt: expire.toMillis(),
        data: {
          id: this.id,
          username: this.username,
          email: this.email,
          roles: this.roles.map((r: any) => r.name),
        },
      }, secretKey)

      const session = await Session.create({
        accessToken: token,
        userId: this.id,
      })

      this.sessions.push(session)

      return {
        accessToken: token,
        expiredAt: expire.toMillis(),
      }
    }

    return { accessToken, expiredAt }
  }

  async json() {
    const { accessToken } = await this.getAccessToken() ?? {}
    const roles = this.roles.map(({ name }: any) => name)

    return {
      id: this.id,
      username: this.username,
      email: this.email,
      accessToken,
      roles,
    }
  }
}
