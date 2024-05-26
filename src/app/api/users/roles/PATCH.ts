import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import '@/domain/polyfills'

import { useDb } from '@/domain/db'
import {
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'

export async function PATCH(req: NextRequest) {
  const { Role } = await useDb()
  const res = NextResponse
  const params = await req.json()
  const { role: roleData } = params ?? {}

  try {
    await apiMiddleware(req, params, res, {
      only: ['PATCH'],
      permit: ['role'],
    })

    await Role.update(roleData, {
      where: { id: roleData.id },
    })
    const role = await Role.findByPk(roleData.id)

    return responseApiSuccess(res, {
      content: {
        message: 'Role updated successfully!',
        data: role,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
