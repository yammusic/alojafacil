import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { useDb } from '@/domain/db'
import {
  NotFoundException,
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'

export async function PATCH(req: NextRequest) {
  const { User, UserInfo } = await useDb()
  const res = NextResponse
  const params = await req.json()
  const { user: userData } = params ?? {}

  try {
    await apiMiddleware(req, params, res, {
      only: ['PATCH'],
      permit: ['user'],
    })

    const { roles = [], info, ...data } = userData
    console.info({ roles, info, data })

    await User.update(data, {
      where: { id: userData.id },
    })
    const user = await User.findByPk(userData.id)
    if (!user) { throw new NotFoundException() }
    await user.$set('roles', roles)

    if (info) {
      await UserInfo.update(info, {
        where: { userId: userData.id },
      })
    }

    return responseApiSuccess(res, {
      content: {
        message: 'User updated successfully!',
        data: user,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
