import { IS_DEVELOPMENT, IS_PRODUCTION } from '../constants/env'

export const isDev = () => IS_DEVELOPMENT
export const isProd = () => IS_PRODUCTION
export const isServer = () => typeof window === 'undefined'
export const isBrowser = () => typeof window !== 'undefined'
