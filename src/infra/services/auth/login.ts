import axios from 'axios'

export interface AuthLoginProps {
  username: string
  password: string
}

export interface AuthLoginResponse {
  content: {
    message: string
    user: {
      accessToken: string
      email: string
      roles: string[]
      username: string
    }
  }
  statu: {
    code: number
    reason: string
    success: boolean
  }
}

export const authLogin = async (user: AuthLoginProps) => {
  const url = '/api/auth/login'
  const { data } = await axios.post<AuthLoginResponse>(url, user)
  return data
}
