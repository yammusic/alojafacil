import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { useDb } from '@/domain/db'
import {
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'

export async function PATCH(req: NextRequest) {
  const { Hotel } = await useDb()
  const res = NextResponse
  const params = await req.json()
  const { hotel: hotelData } = params ?? {}

  try {
    await apiMiddleware(req, params, res, {
      only: ['PATCH'],
      permit: ['hotel'],
    })

    await Hotel.update(hotelData, {
      where: { id: hotelData.id },
    })
    const hotel = await Hotel.findByPk(hotelData.id)

    return responseApiSuccess(res, {
      content: {
        message: 'Hotel updated successfully!',
        data: hotel,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
