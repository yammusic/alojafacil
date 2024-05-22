'use client'

import { combineReducers } from '@reduxjs/toolkit'
import { appReducer, themeReducer, hotelsReducer } from '../features'

type Reducers = {
  app: typeof appReducer
  hotels: typeof hotelsReducer
  theme: typeof themeReducer
}

export const reducers: Reducers = {
  app: appReducer,
  hotels: hotelsReducer,
  theme: themeReducer,
}

export const rootReducer = combineReducers({ ...reducers })
