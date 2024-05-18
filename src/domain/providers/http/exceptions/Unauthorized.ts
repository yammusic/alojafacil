import { ApiException, StatusCode } from '../interfaces'

export class UnauthorizedException extends ApiException {
  public _getDefaultValues() {
    const code = StatusCode.UNAUTHORIZED
    const reason = StatusCode[code]
    const [status, content] = [
      { code, reason, success: false },
      { message: `${reason.humanize()}` },
    ]

    return { content, status }
  }
}
