export type ResponseContentType = { message: string }
export type ResponseHeadersType = Headers
export type ResponseStatusType = { code: number, reason: string, success: boolean }
export type ResponseExtraType = { [key: string]: any }

export interface HttpResponseBase {
  content: ResponseContentType
}

export interface ApiResponse extends HttpResponseBase {
  status?: ResponseStatusType
  _extra?: ResponseExtraType
}
