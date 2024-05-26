import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import '@/domain/polyfills'

import { useDb } from '@/domain/db'
import {
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'

export async function DELETE(req: NextRequest) {
  const { Hotel } = await useDb()
  const res = NextResponse
  const params = await req.json()
  const { id } = params ?? {}

  try {
    await apiMiddleware(req, params, res, {
      only: ['DELETE'],
      permit: ['id'],
    })

    await Hotel.destroy({ where: { id } })

    return responseApiSuccess(res, {
      content: {
        message: 'Hotel deleted successfully!',
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
