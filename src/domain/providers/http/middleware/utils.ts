import type { NextRequest, NextResponse } from 'next/server'

type Response = typeof NextResponse

export const loadMiddleware = (req: NextRequest, res: Response, middleware: any) => (
  new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
)
