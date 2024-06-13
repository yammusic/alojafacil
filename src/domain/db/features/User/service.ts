import type { WhereOptions } from 'sequelize'
import { useDb } from '../../client'
import type { UserAttributes } from './types'

type Where = WhereOptions<UserAttributes>

export const getUsers = async () => {
  const { User, UserInfo, Role } = await useDb()
  const include = [UserInfo, Role]
  const users = await User.findAll({ include })
  return users
}

export const getUser = async (where: Where) => {
  const { User, UserInfo } = await useDb()
  const include = [UserInfo]
  const user = await User.findOne({ where, include })
  await user?.getRoles()
  await user?.getSessions()
  return user
}

export const getUserByUsername = async (username: string, withInclude = false) => {
  const { User, Role, Session, UserInfo } = await useDb()
  const include = withInclude ? [Role, Session, UserInfo] : []
  let user = await User.findOne({ where: { username }, include })
  if (!user) { user = await User.findOne({ where: { email: username }, include }) }
  return user
}

export const getUserByAccessToken = async (accessToken: string) => {
  const { User, Session } = await useDb()
  const include = [User]
  const session = await Session.findOne({ where: { accessToken }, include })
  return session?.user
}
