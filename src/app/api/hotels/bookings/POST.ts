import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { DateTime } from 'luxon'

import { useDb } from '@/domain/db'
import { sendEmail } from '@/domain/providers/email'
import {
  NotFoundException,
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'

export async function POST(req: NextRequest) {
  const { Booking, Room, Hotel } = await useDb()
  const res = NextResponse
  const params = await req.json()
  const { booking: bookingData } = params ?? {}

  try {
    await apiMiddleware(req, params, res, {
      only: ['POST'],
      permit: ['booking'],
    })

    const info = JSON.parse(bookingData.guestInfo || '{}')
    const room = await Room.findByPk(bookingData.roomId, { include: [Hotel] })
    if (!room) { throw new NotFoundException() }

    const checkIn = DateTime.fromISO(bookingData.checkIn)
    const checkOut = DateTime.fromISO(bookingData.checkOut)

    const booking = await Booking.create(bookingData)

    await sendEmail({
      email: info.email,
      name: room.hotel.name,
      type: room.type,
      checkIn: checkIn.toISODate(),
      checkOut: checkOut.toISODate(),
      picture: room.picture,
      price: room.basePrice,
      taxes: room.taxes,
      discount: room.discount,
    })


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
