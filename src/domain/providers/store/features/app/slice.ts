import { createSlice } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

import {
  setReady,
  setSidebarMenu,
  setSidebarMenuActive,
  setCities,
  setCountries,
  setStates,
} from './actions'
import { sidebarMenu } from './sidebar'
import type { AppState } from './types'

const initialState: AppState = {
  cities: [],
  countries: [],
  isReady: false,
  sidebarMenu,
  sidebarMenuActive: [],
  states: [],
}

const persistConfig = {
  blacklist: [],
  key: 'app',
  storage,
  version: 1,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(setReady, (state, { payload }) => ({
      ...state,
      isReady: payload,
    }))

    addCase(setCities, (state, { payload }) => ({
      ...state,
      cities: payload,
    }))

    addCase(setCountries, (state, { payload }) => ({
      ...state,
      countries: payload,
    }))

    addCase(setStates, (state, { payload }) => ({
      ...state,
      states: payload,
    }))

    addCase(setSidebarMenu, (state, { payload }) => ({
      ...state,
      sidebarMenu: payload,
    }))

    addCase(setSidebarMenuActive, (state, { payload }) => ({
      ...state,
      sidebarMenuActive: payload,
    }))
  },
})

export const appReducer = persistReducer<AppState>(persistConfig, appSlice.reducer)
