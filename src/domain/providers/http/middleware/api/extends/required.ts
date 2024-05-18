import { UnauthorizedException } from '../../../exceptions/Unauthorized'
// import { getUserByAccessToken } from '../../../../../../../infrastructure'
// import { isTokenExpired } from '../../../../../../Security'

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

  // const user = await getUserByAccessToken(accessToken)
  // if (!user) {
  //   err.setMessage('Invalid access token')
  //   throw err
  // }

  // const isExpired = isTokenExpired(accessToken, user.secretKey)
  // if (isExpired) {
  //   err.setMessage('Access token is expired')
  //   throw err
  // }
}
