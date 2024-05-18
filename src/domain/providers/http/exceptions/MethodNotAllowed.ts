import type { MethodType } from '../interfaces'
import { ApiException, StatusCode } from '../interfaces'

export interface MethodNotAllowedExceptionProps {
  only: MethodType[]
  target: MethodType
}

type Props = MethodNotAllowedExceptionProps

export class MethodNotAllowedException extends ApiException<Props> {
  public _getDefaultValues(props: Props) {
    const { only, target } = props
    const code = StatusCode.METHOD_NOT_ALLOWED
    const reason = StatusCode[code]
    const [status, content, headers] = [
      { code, reason, success: false },
      { message: `${target} ${reason.humanize()}` },
      new Headers({ Allow: [...only].toString() }),
    ]

    return { content, headers, status }
  }
}
