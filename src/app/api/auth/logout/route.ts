import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { deleteCookie } from 'cookies-next'

import {
  NotFoundException,
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'
import { SessionStatus, getSession } from '@/domain/db/features/Session'

export async function DELETE(req: Request) {
  const res = NextResponse
  const params = {}

  try {
    await apiMiddleware(req, params, res, {
      authorization: true,
      only: ['DELETE'],
    })

    const accessToken = req.headers.get('authorization')?.split(' ')[1]
    const session = await getSession({ accessToken })
    if (!session) { throw new NotFoundException() }

    session.status = SessionStatus.EXPIRED
    await session.save()

    deleteCookie('session', { cookies })

    return responseApiSuccess(res, {
      content: {
        message: 'Logout successfully!',
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
