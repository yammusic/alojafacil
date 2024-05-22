import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import {
  NotFoundException,
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers'
import { getState, getStates } from '@/domain/db'
import { requestStatesValidator } from './validator'

export async function GET(req: NextRequest) {
  const res = NextResponse
  const params = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  )

  try {
    await apiMiddleware(req, params, res, {
      only: ['GET'],
      permit: ['id', 'countryId'],
      validator: requestStatesValidator,
    })

    const { id, countryId } = params
    let data: any = null

    if (id && !countryId) {
      data = await getState({ id: Number(id) })
    } else if (id && countryId) {
      data = await getState({
        id: Number(id),
        countryId: Number(countryId),
      })
    } else {
      data = await getStates({ countryId: Number(countryId) })
    }

    if (!data) { throw new NotFoundException() }
    const isPlural = data instanceof Array

    return responseApiSuccess(res, {
      content: {
        message: `Get ${!isPlural ? 'state' : 'states'} successfully!`,
        data,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
