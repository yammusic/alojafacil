import axios from 'axios'

import type { UserAttributes } from '@/domain/db/features/User/types'

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

export interface UsersResponse extends Response {
  content: {
    message: string
    data: UserAttributes[]
  }
}

export interface UserResponse extends Response {
  content: {
    message: string
    data: UserAttributes
  }
}

export const fetchUsers = async () => {
  const url = '/api/users'
  const { data } = await axios.get<UsersResponse>(url)
  return data
}

export const fetchUser = async (id: number) => {
  const url = `/api/users?id=${id}`
  const { data } = await axios.get<UserAttributes>(url)
  return data
}

export const createUser = async (user: UserAttributes) => {
  const url = '/api/users'
  const { data } = await axios.post<UserResponse>(url, { user })
  return data
}

export const updateUser = async (user: UserAttributes) => {
  const url = '/api/users'
  const { data } = await axios.patch<UserResponse>(url, { user })
  return data
}

export const deleteUser = async (id: number) => {
  const url = '/api/users'
  const { data } = await axios.delete<UserResponse>(url, { data: { id } })
  return data
}
