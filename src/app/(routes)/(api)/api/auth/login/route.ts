import { NextResponse } from 'next/server'
import '@/domain/polyfills'

import {
  NotFoundException,
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers'
import { getUser } from '@/domain/db'
import { requestLoginValidator } from './validator'

type LoginResponse = {
  content: {
    message: string
    user: any
  }
}

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

    await user.sign()

    return responseApiSuccess<LoginResponse>(res, {
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
