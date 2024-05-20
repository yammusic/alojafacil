/* eslint-disable react-hooks/rules-of-hooks */
import { DateTime } from 'luxon'

import { SECRET_KEY } from '@/domain/constants'
import { decodeJWT, hashPassword, signJWT } from '@/domain/utils'
import { useTurso } from '../client'

import type { Role } from './Role'
import type { SessionProps } from './Session'
import { Session, SessionStatus } from './Session'

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
  DELETED = 'DELETED',
  DISABLED = 'DISABLED',
}

export interface UserProps {
  id?: number
  username?: string
  email?: string
  password?: string
  secretKey?: string
  status?: UserStatus
}

export class User {
  id: number = 0
  username: string = ''
  email: string = ''
  password: string = ''
  secretKey: string = ''
  status: UserStatus = UserStatus.ACTIVE
  roles: Role[] = []
  sessions: Session[] = []

  constructor(props: UserProps) {
    Object.assign(this, props)
  }

  static async all() {
    const db = useTurso()

    try {
      const users = await db.user.findMany()
      return users.map((user) => new User(user as UserProps))
    } catch (error: any) {
      console.error(error)
      return null
    } finally {
      db.$disconnect()
    }
  }

  static async findOne(where: UserProps, include?: UserInclude) {
    const db = useTurso()

    try {
      const user = await db.user.findFirst({ where, include })
      if (!user) return null
      return new User(user as UserProps)
    } catch (error: any) {
      console.error(error)
      return null
    } finally {
      db.$disconnect()
    }
  }

  async save() {
    const db = useTurso()

    try {
      return await db.user.upsert({
        where: { id: this.id },
        create: this,
        update: this,
      })
    } catch (error: any) {
      console.error(error)
      return null
    } finally {
      db.$disconnect()
    }
  }

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
      const session = new Session(s as SessionProps)

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
      }) as Session

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

export interface UserInclude {
  info?: boolean
  roles?: boolean
  sessions?: boolean
}
