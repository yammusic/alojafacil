import { ApiException, StatusCode } from '../interfaces'

export class BadRequestException extends ApiException {
  public _getDefaultValues() {
    const code = StatusCode.BAD_REQUEST
    const reason = StatusCode[code]
    const [status, content] = [
      { code, reason, success: false },
      { message: `${reason.humanize()}` },
    ]

    return { content, status }
  }
}
