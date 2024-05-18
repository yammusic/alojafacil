import type { NextResponse } from 'next/server'
import type { MethodType } from '../../interfaces/HTTPMethod'

type Response = typeof NextResponse
type Options = {
  authorization?: boolean,
  only?: MethodType[],
  permit?: string[],
  validator?: any,
}

export const apiMiddleware = async (req: Request, params: any, res: Response, opts: Options = {}) => {
  // const { loadMiddleware } = await import('../utils')
  // const { corsMiddleware } = await import('../cors')
  const {
    validateOnlyMethods,
    validateParamsPermitted,
    validateAccessAuthorization,
  } = await import('./extends')
  const {
    authorization,
    only,
    permit,
    validator,
  } = opts

  // CORS implementation
  // await loadMiddleware(req, res, corsMiddleware)

  // Valid required method
  if (!!only && only.length > 0) {
    validateOnlyMethods(req, only)
  }

  // Valid permit params
  if (!!permit && permit.length > 0) {
    await validateParamsPermitted(params, permit)
  }

  // Valid authorization header
  if (authorization) {
    await validateAccessAuthorization(req)
  }

  // Use custom validator
  if (validator && typeof validator === 'function') {
    await validator(params)
  }
}
