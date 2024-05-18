import { BadRequestException } from '../../../exceptions/BadRequest'

export const validateParamsPermitted = async (params: any, permit: string[]) => {
  const keys = Object.keys(params ?? {})
  const badParam = keys.find(k => !permit.includes(k))

  if (badParam) {
    const err = new BadRequestException()
    err.setMessage(`Request parameter '${badParam}' is not permitted`)
    throw err
  }
}
