import type { JWTPayload } from 'jose'
import { SignJWT, jwtVerify } from 'jose'
import { DateTime } from 'luxon'

export enum AlgorithmJWT {
  HS256 = 'HS256',
  HS384 = 'HS384',
  HS512 = 'HS512',
  RS256 = 'RS256',
  RS384 = 'RS384',
  RS512 = 'RS512',
  PS256 = 'PS256',
  PS384 = 'PS384',
  PS512 = 'PS512',
  ES256 = 'ES256',
  ES384 = 'ES384',
  ES512 = 'ES512',
}

interface Payload extends JWTPayload {
  expiredAt?: number,
  createdAt?: number,
  data: { [key: string]: any },
}

interface SignOptions {
  alg?: AlgorithmJWT,
}

interface DecodeOptions {
  algorithms?: AlgorithmJWT[],
}

export const signJWT = async (payload: Payload, secret: string, opts?: SignOptions) => {
  const createdAt = DateTime.now()
  const expiredAt = createdAt.plus({ 'days': 7 })
  const secretKey = new TextEncoder().encode(secret)
  const { alg = AlgorithmJWT.HS256 } = { ...opts }

  const sign = new SignJWT({
    createdAt: createdAt.toMillis(),
    expiredAt: expiredAt.toMillis(),
    ...payload,
  })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(expiredAt.toMillis())
    .sign(secretKey)

  return sign
}

export const decodeJWT = async (jwt: string, secret: string, opts?: DecodeOptions) => {
  const secretKey = new TextEncoder().encode(secret)
  const { algorithms = [AlgorithmJWT.HS256] } = { ...opts }
  const { payload } = await jwtVerify(jwt, secretKey, {
    algorithms,
  })

  return payload as Payload
}

export const isTokenExpired = async (token: string, secret: string) => {
  const { expiredAt } = await decodeJWT(token, secret)
  return (Number(expiredAt) < DateTime.now().toMillis())
}
