import type { ConfigureStoreOptions } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'

import { isDev } from '@/domain/utils'
import { rootReducer } from './reducers'
import { useMiddleware, sagaMiddleware } from './middlewares'
import { rootSaga } from './sagas'

export const makeStore = () => {
  // Get config options
  const [middleware, reducer] = [
    useMiddleware as ConfigureStoreOptions['middleware'],
    rootReducer as ConfigureStoreOptions['reducer'],
  ]

  // Create store
  const store = configureStore({
    devTools: isDev() && { trace: true },
    middleware,
    reducer,
  })

  // Create persistor
  const persistor = persistStore(store)

  // Run Sagas
  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}

export const { store, persistor } = makeStore()
