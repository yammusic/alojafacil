/* eslint-disable react-hooks/rules-of-hooks */
import { useTurso } from '../client'

export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
  DELETED = 'DELETED',
  DISABLED = 'DISABLED',
  EXPIRED = 'EXPIRED',
}

export type SessionProps = {
  accessToken: string
  status?: SessionStatus
  userId: number
}

export class Session {
  id: number = 0
  accessToken: string = ''
  status: SessionStatus = SessionStatus.ACTIVE
  userId: number = 0

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

  static async findOne(where: SessionProps) {
    const db = useTurso()

    try {
      const session = await db.session.findFirst({ where })
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
