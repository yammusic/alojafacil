import type { UserProps } from '../models'
import { Session, User } from '../models'

export const getUser = async (username: string) => {
  const include = { roles: true, sessions: true }
  let user = await User.findOne({ username }, include)
  if (!user) { user = await User.findOne({ email: username }, include) }
  return user
}

export const getUserByAccessToken = async (accessToken: string) => {
  const session = await Session.findOne({ accessToken }, { user: true })
  return new User(session?.user as UserProps)
}
