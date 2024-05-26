import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { useDb } from '@/domain/db'
import {
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'

export async function POST(req: NextRequest) {
  const { Room } = await useDb()
  const res = NextResponse
  const params = await req.json()
  const { room: roomData } = params ?? {}

  try {
    await apiMiddleware(req, params, res, {
      only: ['POST'],
      permit: ['room'],
    })

    const room = await Room.create(roomData)

    return responseApiSuccess(res, {
      content: {
        message: 'Room created successfully!',
        data: room,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
