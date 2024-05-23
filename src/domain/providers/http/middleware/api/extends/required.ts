import { SessionStatus, getSession, getUserByAccessToken } from '@/domain/db'
import { isTokenExpired } from '@/domain/utils'
import { UnauthorizedException } from '../../../exceptions/Unauthorized'

export const validateAccessAuthorization = async (req: Request) => {
  const BEARER = 'Bearer'
  const bearerToken = req.headers.get('authorization')
  const isBearer = !!bearerToken?.includes(BEARER)
  const accessToken = bearerToken?.replace(BEARER, '').trim()
  const err = new UnauthorizedException()

  if (!bearerToken) {
    err.setMessage('Authorization header is required')
    throw err
  }
  if (!isBearer) {
    err.setMessage('Authorization header required a Bearer token')
    throw err
  }
  if (!accessToken) {
    err.setMessage('Authorization header required a token')
    throw err
  }

  const user = await getUserByAccessToken(accessToken)
  if (!user) {
    err.setMessage('Invalid access token')
    throw err
  }

  const session = await getSession({ accessToken })
  const isExpired = await isTokenExpired(accessToken, user.secretKey)
  if (isExpired || session?.status === SessionStatus.EXPIRED) {
    err.setMessage('Access token is expired')
    throw err
  }

}
