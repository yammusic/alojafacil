import createSagaMiddleware from 'redux-saga'
import loggerMiddleware from 'redux-logger'
import type { GetDefaultMiddleware } from 'node_modules/@reduxjs/toolkit/dist/getDefaultMiddleware'

import { isDev } from '@/domain/utils'

export const sagaMiddleware = createSagaMiddleware()

export const middlewares = [
  sagaMiddleware,
  isDev && loggerMiddleware,
]

export const useMiddleware = (getDefaultMiddleware: GetDefaultMiddleware) => (
  getDefaultMiddleware({ serializableCheck: false }).concat(...middlewares)
)
