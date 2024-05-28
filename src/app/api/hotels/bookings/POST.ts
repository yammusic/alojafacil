import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { useDb } from '@/domain/db'
import {
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'

export async function POST(req: NextRequest) {
  const { Booking } = await useDb()
  const res = NextResponse
  const params = await req.json()
  const { booking: bookingData } = params ?? {}

  try {
    await apiMiddleware(req, params, res, {
      only: ['POST'],
      permit: ['booking'],
    })

    const booking = await Booking.create(bookingData)

    return responseApiSuccess(res, {
      content: {
        message: 'Booking created successfully!',
        data: booking,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
