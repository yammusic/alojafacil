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
import { Op } from 'sequelize'
import { DateTime } from 'luxon'

import { SECRET_KEY } from '@/domain/constants/env'
import { decodeJWT, hashPassword, signJWT } from '@/domain/utils/crypto'
import { UserStatus, type UserAttributes, type UserCreationAttributes } from './types'
import { Session, SessionStatus } from '../Session'
import { Role } from '../Role'
import { UserInfo } from '../UserInfo'
import { UserRole } from '../UserRole'
import { Booking } from '../Booking'
import { Review } from '../Review'
import { useDb } from '../../client'

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

  @Column(DataType.TEXT)
  secretKey!: string

  @Default(UserStatus.ACTIVE)
  @Column(DataType.TEXT)
  status!: UserStatus

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt!: Date

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt?: Date

  @HasOne(() => UserInfo)
  info?: ReturnType<() => (UserInfo | null)>

  @BelongsToMany(() => Role, () => UserRole)
  roles!: Role[]

  @HasMany(() => Session)
  sessions!: Session[]

  @HasMany(() => Booking)
  bookings!: Booking[]

  @HasMany(() => Review)
  reviews!: Review[]

  async getRoles() {
    if (!this.roles) {
      const { sequelize } = await useDb()
      const sql = `SELECT "roleId" FROM users_roles WHERE "userId" = ${this.id}`
      const roleIds = (await sequelize.query(sql))[0].map((r: any) => r.roleId)
      this.roles = await Role.findAll({ where: { id: { [Op.in]: roleIds } } })
    }
    return this.roles
  }

  async getInfo() {
    if (!this.info) {
      this.info = await UserInfo.findOne({ where: { userId: this.id } })
    }
    return this.info
  }

  async getSessions() {
    if (!this.sessions) {
      this.sessions = await Session.findAll({ where: { userId: this.id } })
    }
    return this.sessions
  }

  async getBookings() {
    if (!this.bookings) {
      this.bookings = await Booking.findAll({ where: { userId: this.id } })
    }
    return this.bookings
  }

  async getReviews() {
    if (!this.reviews) {
      this.reviews = await Review.findAll({ where: { userId: this.id } })
    }
    return this.reviews
  }

  async isAdmin() {
    if (!this.roles) { await this.getRoles() }
    return this.roles?.some((r: any) => r.name === 'admin')
  }

  hasSamePassword(password: string) {
    return this.password === hashPassword(password)
  }

  // Sessions
  async getAccessToken() {
    const secretKey = this.secretKey ?? SECRET_KEY
    if (!this.sessions) { await this.getSessions() }

    const activeSessions = this.sessions?.filter((s: any) => s.status === SessionStatus.ACTIVE)
    if (!activeSessions) { return null }
    let activeToken

    for (const s of activeSessions) {
      const { expiredAt } = await decodeJWT(s.accessToken, secretKey)
      const session = await Session.findByPk(s.id)
      if (!session) { continue }

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
    if (!this.roles) { await this.getRoles() }

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
    if (!this.roles) { await this.getRoles() }
    const roles = this.roles?.map(({ name }: any) => name)

    return {
      id: this.id,
      username: this.username,
      email: this.email,
      accessToken,
      roles,
    }
  }
}
