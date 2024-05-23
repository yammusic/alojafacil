import type { WhereOptions } from 'sequelize'
import { useDb } from '../../client'
import type { SessionAttributes } from './types'

export const getSessions = async (userId?: number) => {
  const { Session } = await useDb()
  const sessions = await Session.findAll({ where: { userId } })
  if (!sessions) return null
  return sessions
}

export const getSession = async (where: WhereOptions<SessionAttributes>) => {
  const { Session, User } = await useDb()
  const include = [User]
  const session = await Session.findOne({ where, include })
  if (!session) return null
  return session
}
