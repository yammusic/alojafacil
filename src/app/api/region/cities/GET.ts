import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import '@/domain/polyfills'

import {
  NotFoundException,
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'
import type { City } from '@/domain/db'
import { getCity, getCities, getHotels } from '@/domain/db'

export async function GET(req: NextRequest) {
  const res = NextResponse
  const params = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  )

  try {
    await apiMiddleware(req, params, res, {
      only: ['GET'],
      permit: ['id', 'stateId', 'countryId'],
    })

    const { id, stateId, countryId } = params
    let data: any = null

    if (id && !stateId) {
      data = await getCity({ id: Number(id) })
    } else if (id && stateId) {
      data = await getCity({
        id: Number(id),
        stateId: Number(stateId),
      })
    } else if (!id && stateId) {
      data = await getCities({ stateId: Number(stateId) })
    } else if (countryId) {
      const seen = new Map<number, City>()
      const hotels = await getHotels()

      hotels.forEach((hotel: any) => {
        if (!seen.has(hotel.cityId)) {
          seen.set(hotel.cityId, hotel.city)
        }
      })

      data = Array.from(seen.values())
    } else {
      data = await getCities()
    }

    if (!data) { throw new NotFoundException() }
    const isPlural = data instanceof Array

    return responseApiSuccess(res, {
      content: {
        message: `Get ${!isPlural ? 'city' : 'cities'} successfully!`,
        data,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
