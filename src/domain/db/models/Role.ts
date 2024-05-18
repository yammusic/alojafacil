/* eslint-disable react-hooks/rules-of-hooks */
import { useTurso } from '../client'

enum RoleStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
  DELETED = 'DELETED',
}

export interface RoleProps {
  id?: number
  name?: string
  status?: RoleStatus
}

export class Role {
  id: number = 0
  name: string = ''
  status: RoleStatus = RoleStatus.ACTIVE

  constructor(props: RoleProps) {
    Object.assign(this, props)
  }

  static async all() {
    const db = useTurso()

    try {
      const roles = await db.role.findMany()
      if (!roles || !roles.length) return null
      return roles.map((role) => new Role(role as RoleProps))
    } catch (error: any) {
      console.error(error)
      return null
    }
  }
}
