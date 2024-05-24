import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import '@/domain/polyfills'

import {
  NotFoundException,
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'
import { getCity, getCities } from '@/domain/db'
import { requestCitiesValidator } from './validator'

export async function POST(req: NextRequest) {
  const res = NextResponse
  const params = await req.json()

  try {
    await apiMiddleware(req, params, res, {
      only: ['POST'],
      permit: ['state'],
      validator: requestCitiesValidator,
    })

    const { id, stateId } = params
    let data: any = null

    if (id && !stateId) {
      data = await getCity({ id: Number(id) })
    } else if (id && stateId) {
      data = await getCity({
        id: Number(id),
        stateId: Number(stateId),
      })
    } else {
      data = await getCities({ stateId: Number(stateId) })
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
