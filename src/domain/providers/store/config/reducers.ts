import { combineReducers } from '@reduxjs/toolkit'
import { appReducer, themeReducer } from '../features'

export const reducers = {
  app: appReducer,
  theme: themeReducer,
}

export const rootReducer = combineReducers({ ...reducers })
