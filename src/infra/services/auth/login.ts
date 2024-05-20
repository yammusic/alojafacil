/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'

export interface AuthLoginProps {
  username: string
  password: string
}

export interface AuthLoginResponse {
  content: {
    message: string
    user: {
      id: number
      accessToken: string
      email: string
      roles: string[]
      username: string
    }
  }
  status: {
    code: number
    reason: string
    success: boolean
  }
}

export const authLogin = async (auth: AuthLoginProps) => {
  const url = '/api/auth/login'
  const { data } = await axios.post<AuthLoginResponse>(url, auth)
  return data
}
