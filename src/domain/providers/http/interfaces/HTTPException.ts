import type {
  ApiResponse,
  ResponseContentType,
  ResponseHeadersType,
  ResponseStatusType,
} from './HTTPResponse'
import { StatusCode } from './HTTPStatus'

export interface ApiExceptionValues {
  content: ResponseContentType
  status: ResponseStatusType
  headers?: ResponseHeadersType
}

export interface ApiExceptionResponse extends ApiResponse {
  headers?: ResponseHeadersType
}

type Response = ApiExceptionResponse
type Values = ApiExceptionValues
type AnyProps = Readonly<{ [key: string]: any }> | undefined

export class ApiException<P =| AnyProps, V =| Values, R =| Response> {
  public content!: ResponseContentType
  public status!: ResponseStatusType
  public headers?: ResponseHeadersType

  constructor(props?: P) {
    const { content, status, headers } = this._getDefaultValues(props) as any

    this.content = content
    this.status = status
    this.headers = headers
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public _getDefaultValues(props?: P): V {
    const code = StatusCode.INTERNAL_SERVER_ERROR
    const reason = StatusCode[code]
    const [status, content] = [
      { code, reason, success: false },
      { message: `${reason.humanize()}` },
    ]

    return { content, status } as V
  }

  public getResponse(): R {
    return {
      content: this.content,
      headers: this.headers,
      status: this.status,
    } as R
  }

  public setMessage(message: string) {
    this.content.message = message
  }
}
