import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { useDb } from '@/domain/db'
import {
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'

export async function POST(req: NextRequest) {
  const { Country } = await useDb()
  const res = NextResponse
  const params = await req.json()
  const { country: countryData } = params ?? {}

  try {
    await apiMiddleware(req, params, res, {
      only: ['POST'],
      permit: ['country'],
    })

    const country = await Country.create(countryData)

    return responseApiSuccess(res, {
      content: {
        message: 'Country created successfully!',
        data: country,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
