import type { SessionProps } from '../models'
import { Session } from '../models'

export const getSessions = async (userId?: number) => {
  const sessions = await Session.all({ userId })
  if (!sessions) return null
  return sessions
}

export const getSession = async (where: SessionProps) => {
  const include = { user: true }
  const session = await Session.findOne(where, include)
  if (!session) return null
  return session
}
