'use client'

import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import loggerMiddleware from 'redux-logger'

import { rootReducer as reducer } from './reducers'
import { rootSaga } from './sagas'
import type { MakeStoreOptions } from '../shared'

export const makeStore = (opts: MakeStoreOptions = {}) => {
  const { isDev = false } = opts

  const sagaMiddleware = createSagaMiddleware()
  const middleware = (getDefaultMiddleware: any) => {
    const middlewares: any[] = [sagaMiddleware]
    if (isDev) middlewares.push(loggerMiddleware)
    return getDefaultMiddleware({ serializableCheck: false }).concat(...middlewares)
  }

  // Create store
  const store = configureStore({
    devTools: isDev && { trace: true },
    middleware,
    reducer,
  })

  // Create persistor
  const persistor = persistStore(store)

  // Run Sagas
  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}

export const useStore = (isDev: boolean = false) => makeStore({ isDev })

export const { store, persistor } = makeStore()
