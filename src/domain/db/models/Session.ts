/* eslint-disable react-hooks/rules-of-hooks */
import { useTurso } from '../client'
import type { User } from './User'

export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
  DELETED = 'DELETED',
  DISABLED = 'DISABLED',
  EXPIRED = 'EXPIRED',
}

export type SessionProps = {
  accessToken?: string
  status?: SessionStatus
  userId?: number
}

export class Session {
  id: number = 0
  user: User
  userId: number = 0
  accessToken: string = ''
  status: SessionStatus = SessionStatus.ACTIVE
  createdAt: Date = new Date()
  updatedAt: Date = new Date()


  constructor(props: SessionProps) {
    Object.assign(this, props)
  }

  static async create(props: SessionProps) {
    const db = useTurso()

    try {
      const session = await db.session.create({ data: props })
      return new Session(session as SessionProps)
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  static async all(where?: SessionProps) {
    const db = useTurso()

    try {
      const sessions = await db.session.findMany({ where })
      return sessions.map((session) => new Session(session as SessionProps))
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  static async findOne(where: SessionProps, include?: SessionInclude) {
    const db = useTurso()

    try {
      const session = await db.session.findFirst({ where, include })
      if (!session) return null
      return new Session(session as SessionProps)
    } catch (error: any) {
      console.error(error)
      return null
    }
  }

  save() {
    const db = useTurso()

    return db.session.upsert({
      where: { id: this.id },
      create: this,
      update: this,
    })
  }
}

export interface SessionInclude {
  user?: boolean
}
