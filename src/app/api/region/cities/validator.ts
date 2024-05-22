import { BadRequestException } from '@/domain/providers'

export const requestCitiesValidator = async (params: any) => {
  const { id, stateId } = params

  if (!id && !stateId) {
    const err = new BadRequestException()
    err.setMessage('Request parameter \'stateId\' is required')
    throw err
  }
}
