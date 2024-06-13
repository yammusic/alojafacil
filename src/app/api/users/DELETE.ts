import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import '@/domain/polyfills'

import { useDb } from '@/domain/db'
import {
  NotFoundException,
  UnauthorizedException,
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'

export async function DELETE(req: NextRequest) {
  const { User, UserInfo } = await useDb()
  const res = NextResponse
  const params = await req.json()
  const { id } = params ?? {}

  try {
    await apiMiddleware(req, params, res, {
      only: ['DELETE'],
      permit: ['id'],
    })

    const user = await User.findByPk(id)
    if (!user) { throw new NotFoundException() }
    if (await user.isAdmin()) { throw new UnauthorizedException() }

    await UserInfo.destroy({ where: { userId: id } })
    await User.destroy({ where: { id } })

    return responseApiSuccess(res, {
      content: {
        message: 'User deleted successfully!',
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
