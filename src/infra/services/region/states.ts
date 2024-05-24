import axios from 'axios'

import type { StateAttributes } from '@/domain/db/features/State/types'

interface Response {
  content: {
    message: string
    data: unknown[]
  }
  status: {
    code: number
    reason: string
    success: boolean
  }
}

export interface StatesResponse extends Response {
  content: {
    message: string
    data: StateAttributes[]
  }
}

export const fetchStates = async (countryId: number) => {
  const url = `/api/region/states?countryId=${countryId}`
  const { data } = await axios.get<StatesResponse>(url)
  return data
}

export const fetchState = async (countryId: number, id: number) => {
  const url = `/api/region/states?id=${id}`
  const { data } = await axios.get<StateAttributes>(url)
  return data
}
