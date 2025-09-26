export type JwtType = 'refresh' | 'access'
export type JwtErrorType = 'expired' | 'unknown' | 'invalid'
export type JwtDecodeResult = [string , null] | [null, JwtErrorType]