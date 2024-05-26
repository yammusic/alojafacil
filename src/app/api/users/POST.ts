import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import '@/domain/polyfills'

import { useDb } from '@/domain/db'
import {
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'
import { SECRET_KEY } from '@/domain/constants'

export async function POST(req: NextRequest) {
  const { User, UserInfo } = await useDb()
  const res = NextResponse
  const params = await req.json()
  const { user: userData } = params ?? {}

  try {
    await apiMiddleware(req, params, res, {
      only: ['POST'],
      permit: ['user'],
    })

    const { roles = [], ...data } = userData
    data.secretKey = SECRET_KEY

    const user = await User.create(data, {
      include: [
        { model: UserInfo, as: 'info' },
      ],
    })

    for (const role of roles) {
      await user.$add('roles', role)
    }

    return responseApiSuccess(res, {
      content: {
        message: 'User created successfully!',
        data: await user.json(),
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
