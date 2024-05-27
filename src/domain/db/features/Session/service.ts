import type { WhereOptions } from 'sequelize'
import { useDb } from '../../client'
import type { SessionAttributes } from './types'

type Where = WhereOptions<SessionAttributes>

export const getSessions = async (where?: Where) => {
  const { Session, User } = await useDb()
  const include = [User]
  const sessions = await Session.findAll({ where, include })
  if (!sessions) return null
  return sessions
}

export const getSession = async (where: Where) => {
  const { Session, User } = await useDb()
  const include = [User]
  const session = await Session.findOne({ where, include })
  if (!session) return null
  return session
}
