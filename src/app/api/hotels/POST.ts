import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { useDb } from '@/domain/db'
import {
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'

export async function POST(req: NextRequest) {
  const { Hotel } = await useDb()
  const res = NextResponse
  const params = await req.json()
  const { hotel: hotelData } = params ?? {}

  try {
    await apiMiddleware(req, params, res, {
      only: ['POST'],
      permit: ['hotel'],
    })

    const hotel = await Hotel.create(hotelData)

    return responseApiSuccess(res, {
      content: {
        message: 'Hotel created successfully!',
        data: hotel,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
