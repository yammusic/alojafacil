import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { useDb } from '@/domain/db'
import {
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'

export async function POST(req: NextRequest) {
  const { Role } = await useDb()
  const res = NextResponse
  const params = await req.json()
  const { role: roleData } = params ?? {}

  try {
    await apiMiddleware(req, params, res, {
      only: ['POST'],
      permit: ['role'],
    })

    const role = await Role.create(roleData)

    return responseApiSuccess(res, {
      content: {
        message: 'Role created successfully!',
        data: role,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
