import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { useDb } from '@/domain/db'
import {
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'

export async function PATCH(req: NextRequest) {
  const { Country } = await useDb()
  const res = NextResponse
  const params = await req.json()
  const { country: countryData } = params ?? {}

  try {
    await apiMiddleware(req, params, res, {
      only: ['PATCH'],
      permit: ['country'],
    })

    await Country.update(countryData, {
      where: { id: countryData.id },
    })
    const country = await Country.findByPk(countryData.id)

    return responseApiSuccess(res, {
      content: {
        message: 'Country updated successfully!',
        data: country,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
