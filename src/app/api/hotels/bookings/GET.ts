import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getRooms, getRoom } from '@/domain/db'
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
      permit: ['id', 'hotelId'],
    })

    const { id, hotelId } = params
    let data: any = null

    if (id && !hotelId) {
      data = await getRoom({ id: Number(id) })
    } else if (id && hotelId) {
      data = await getRoom({
        id: Number(id),
        hotelId: Number(hotelId),
      })
    } else if (!id && hotelId) {
      data = await getRooms({ hotelId: Number(hotelId) })
    } else {
      data = await getRooms()
    }

    if (!data) { throw new NotFoundException() }
    const isPlural = data instanceof Array

    return responseApiSuccess(res, {
      content: {
        message: `Get ${!isPlural ? 'room' : 'rooms'} successfully!`,
        data,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
