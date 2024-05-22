import createSagaMiddleware from 'redux-saga'
import loggerMiddleware from 'redux-logger'

import { isDev } from '@/domain/utils'

export const sagaMiddleware = createSagaMiddleware()

export const middlewares = [
  sagaMiddleware,
  isDev() && loggerMiddleware,
]

export const useMiddleware = (getDefaultMiddleware: any) => (
  getDefaultMiddleware({ serializableCheck: false }).concat(...middlewares)
)
