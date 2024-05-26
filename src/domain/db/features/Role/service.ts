import type { WhereOptions } from 'sequelize'
import { useDb } from '../../client'
import type { RoleAttributes } from './types'

type Where = WhereOptions<RoleAttributes>

export const getRoles = async () => {
  const { Role } = await useDb()
  const roles = await Role.findAll()
  return roles
}

export const getRole = async (where: Where) => {
  const { Role } = await useDb()
  const role = await Role.findOne({ where })
  return role
}
