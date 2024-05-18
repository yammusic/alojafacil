import { createApi } from '../../clients/utils'

export const useAuthApi = () => {
  try {
    return createApi('/api/auth')
  } catch (error) {
    console.error(error)
  }
}
