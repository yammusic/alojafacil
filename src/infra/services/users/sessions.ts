import axios from 'axios'

import type { SessionAttributes } from '@/domain/db/features/Session/types'

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

export interface SessionsResponse extends Response {
  content: {
    message: string
    data: SessionAttributes[]
  }
}

export interface SessionResponse extends Response {
  content: {
    message: string
    data: SessionAttributes
  }
}

export const fetchSessions = async () => {
  const url = '/api/users/sessions'
  const { data } = await axios.get<SessionsResponse>(url)
  return data
}

export const fetchSession = async (id: number) => {
  const url = `/api/users/sessions?id=${id}`
  const { data } = await axios.get<SessionAttributes>(url)
  return data
}

export const createSession = async (session: SessionAttributes) => {
  const url = '/api/users/sessions'
  const { data } = await axios.post<SessionResponse>(url, { session })
  return data
}

export const updateSession = async (session: SessionAttributes) => {
  const url = '/api/users/sessions'
  const { data } = await axios.patch<SessionResponse>(url, { session })
  return data
}

export const deleteSession = async (id: number) => {
  const url = '/api/users/sessions'
  const { data } = await axios.delete<SessionResponse>(url, { data: { id } })
  return data
}
