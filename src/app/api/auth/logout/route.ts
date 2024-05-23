import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { deleteCookie } from 'cookies-next'

import {
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers'
import type { Session } from '@/domain/db'
import { SessionStatus, getSession } from '@/domain/db'

export async function DELETE(req: Request) {
  const res = NextResponse
  const params = {}

  try {
    await apiMiddleware(req, params, res, {
      authorization: true,
      only: ['DELETE'],
    })

    const accessToken = req.headers.get('authorization')?.split(' ')[1]
    const session = await getSession({ accessToken }) as Session
    session.status = SessionStatus.EXPIRED
    // session.updatedAt = new Date()
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
