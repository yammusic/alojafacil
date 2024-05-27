import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import '@/domain/polyfills'

import { getSessions, getSession } from '@/domain/db'
import {
  NotFoundException,
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'

export async function GET(req: NextRequest) {
  const res = NextResponse
  const params = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  )

  try {
    await apiMiddleware(req, params, res, {
      only: ['GET'],
      permit: ['id'],
    })

    const { id } = params
    let data: any = null

    if (id) {
      data = await getSession({ id: Number(id) })
    } else {
      data = await getSessions()
    }

    if (!data) { throw new NotFoundException() }
    const isPlural = data instanceof Array

    return responseApiSuccess(res, {
      content: {
        message: `Get ${!isPlural ? 'session' : 'sessions'} successfully!`,
        data,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
