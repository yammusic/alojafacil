import type { NextResponse } from 'next/server'
import { StatusCode } from '../interfaces/HTTPStatus'
import type { ApiResponse } from '../interfaces/HTTPResponse'

type Response = typeof NextResponse

export const responseApiSuccess = <R =| ApiResponse>(res: Response, body?: R) => {
  const code = StatusCode.OK
  const reason = StatusCode[code]

  const response = {
    content: { message: reason },
    status: { code, reason, success: true },
    ...(body ?? {}),
  } as R

  return res.json({ ...response }, { status: 200 })
}
