import axios from 'axios'

import type { RoleAttributes } from '@/domain/db/features/Role/types'

interface Response {
  content: {
    message: string
    data: any
  }
  status: {
    code: number
    reason: string
    success: boolean
  }
}

export interface RolesResponse extends Response {
  content: {
    message: string
    data: RoleAttributes[]
  }
}

export interface RoleResponse extends Response {
  content: {
    message: string
    data: RoleAttributes
  }
}

export const fetchRoles = async () => {
  const url = '/api/users/roles'
  const { data } = await axios.get<RolesResponse>(url)
  return data
}

export const fetchRole = async (id: number) => {
  const url = `/api/users/roles?id=${id}`
  const { data } = await axios.get<RoleAttributes>(url)
  return data
}

export const createRole = async (role: RoleAttributes) => {
  const url = '/api/users/roles'
  const { data } = await axios.post<RoleResponse>(url, { role })
  return data
}

export const updateRole = async (role: RoleAttributes) => {
  const url = '/api/users/roles'
  const { data } = await axios.patch<RoleResponse>(url, { role })
  return data
}

export const deleteRole = async (id: number) => {
  const url = '/api/users/roles'
  const { data } = await axios.delete<RoleResponse>(url, { data: { id } })
  return data
}
