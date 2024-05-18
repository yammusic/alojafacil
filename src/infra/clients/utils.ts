'use client'

import useSWR from 'swr'
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

// Función para realizar solicitudes con axios
const fetcher = async (url: string, token?: string, config?: AxiosRequestConfig) => {
  const headers = token ? { ...config?.headers, Authorization: `Bearer ${token}` } : { ...config?.headers }
  const response = await axios(url, { ...config, headers })
  return response.data
}

// Crea un proxy para interceptar las llamadas a métodos HTTP
export const createApi = (baseUrl: string) => {
  return new Proxy({}, {
    get(_, endpoint: string) {
      return (params?: unknown, token?: string, config?: AxiosRequestConfig) => {
        const url = `${baseUrl}/${endpoint}`

        if (params && config && config.method === 'get') {
          config.params = params
        }

        const { data, error } = useSWR([url, config], fetcher as any)

        if (error) throw error
        return data
      }
    },
  }) as any
}
