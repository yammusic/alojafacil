import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getUsers, getUser } from '@/domain/db'
import {
  NotFoundException,
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'

export async function GET(req: NextRequest) {
  const res = NextResponse
  const params = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  )

  try {
    await apiMiddleware(req, params, res, {
      only: ['GET'],
      permit: ['id'],
    })

    const { id } = params
    const users = (
      id
        ? await getUser({ id: Number(id) })
        : await getUsers()
    )

    if (!users) { throw new NotFoundException() }
    const isPlural = users instanceof Array
    let data: any = users

    if (isPlural && users.length > 0) {
      data = []
      for (const user of users) {
        data.push(await user.json())
      }
    } else if (!isPlural && data) {
      await data.getRoles()
      await data.getInfo()
    }

    return responseApiSuccess(res, {
      content: {
        message: `Get ${!isPlural ? 'user' : 'users'} successfully!`,
        data,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
