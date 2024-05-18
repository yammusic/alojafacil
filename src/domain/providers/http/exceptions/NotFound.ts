import { ApiException, StatusCode } from '../interfaces'

export class NotFoundException extends ApiException {
  public _getDefaultValues() {
    const code = StatusCode.NOT_FOUND
    const reason = StatusCode[code]
    const [status, content] = [
      { code, reason, success: false },
      { message: `${reason.humanize()}` },
    ]

    return { content, status }
  }
}
