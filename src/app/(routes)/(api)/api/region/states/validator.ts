import { BadRequestException } from '@/domain/providers'

export const requestStatesValidator = async (params: any) => {
  const { id, countryId } = params

  if (!id && !countryId) {
    const err = new BadRequestException()
    err.setMessage('Request parameter \'countryId\' is required')
    throw err
  }
}
