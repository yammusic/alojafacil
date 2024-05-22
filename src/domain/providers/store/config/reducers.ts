import { combineReducers } from '@reduxjs/toolkit'
import { appReducer, themeReducer, hotelsReducer } from '../features'

export const reducers = {
  app: appReducer,
  hotels: hotelsReducer,
  theme: themeReducer,
}

export const rootReducer = combineReducers({ ...reducers })
