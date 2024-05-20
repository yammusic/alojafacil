import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'

export const useSession = () => {
  const session = getCookie('session', { cookies })
  return session
}
