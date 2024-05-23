import { useDb } from '../../client'
import type { UserAttributes } from './types'

export const getUser = async (username: string) => {
  const { User, Role, Session } = await useDb()
  const include = [Role, Session]
  let user = await User.findOne({ where: { username }, include })
  if (!user) { user = await User.findOne({ where: { email: username }, include }) }
  return user
}

export const getUserByAccessToken = async (accessToken: string) => {
  const { User, Session } = await useDb()
  const include = [User]
  const session = await Session.findOne({ where: { accessToken }, include })
  return new User(session?.user as UserAttributes)
}
