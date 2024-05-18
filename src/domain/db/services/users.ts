import { User } from '../models'

export const getUser = async (username: string) => {
  const include = { roles: true, sessions: true }
  let user = await User.findOne({ username }, include)
  if (!user) { user = await User.findOne({ email: username }, include) }
  return user
}
