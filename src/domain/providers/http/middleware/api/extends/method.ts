import type { MethodType } from '../../../interfaces/HTTPMethod'
import { MethodNotAllowedException } from '../../../exceptions/MethodNotAllowed'

export const validateOnlyMethods = (req: Request, only: MethodType[]) => {
  const target = req.method as MethodType

  if (!only.includes(target)) {
    throw new MethodNotAllowedException({ only, target })
  }
}
