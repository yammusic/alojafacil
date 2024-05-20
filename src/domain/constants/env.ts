export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production'

export const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY
