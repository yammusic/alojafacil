import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { setCookie } from 'cookies-next'
import '@/domain/polyfills'

import {
  NotFoundException,
  UnauthorizedException,
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers'
import { getUser } from '@/domain/db'
import { requestLoginValidator } from './validator'

export async function POST(req: Request) {
  const res = NextResponse
  const params = await req.json()
  const { username } = params

  try {
    await apiMiddleware(req, params, res, {
      only: ['POST'],
      permit: ['username', 'password'],
      validator: requestLoginValidator,
    })

    const user = await getUser(username)
    if (!user) { throw new NotFoundException() }

    const { accessToken, expiredAt } = await user.sign()
    const isExpired = Number(expiredAt) < Date.now()
    if (!accessToken || isExpired) { throw new UnauthorizedException() }

    setCookie('session', accessToken, {
      cookies,
      // httpOnly: true,
      // secure: true,
      // expires: new Date(Number(expiredAt)),
      // sameSite: 'lax',
      // path: '/',
    })

    return responseApiSuccess(res, {
      content: {
        message: 'Login successfully!',
        user: await user.json(),
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
