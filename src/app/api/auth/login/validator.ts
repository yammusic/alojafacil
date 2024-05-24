import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@/domain/providers/http'
import { getUser } from '@/domain/db'

export const requestLoginValidator = async (params: any) => {
  const { username, password } = params

  if (!username || !password) {
    const err = new BadRequestException()
    const params = `${!username ? '\'username\'' : ''}${!password && (!username ? ' and \'password\'' : '\'password\'')}`
    err.setMessage(`Request parameter ${params} is required`)
    throw err
  }

  const user = await getUser(username)

  if (!user) {
    const err = new NotFoundException()
    err.setMessage(`User '${username}' don't exists`)
    throw err
  } else if (!user.hasSamePassword(password)) {
    const err = new UnauthorizedException()
    err.setMessage('Incorrect password')
    throw err
  }
}
