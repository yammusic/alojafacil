'use client'

import { createSlice } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

import { roboto } from '@/domain/providers/theme'
import {
  setBorderRadius,
  setColorMode,
  setDrawerOpen,
  setDrawerWidth,
  setFontFamily,
} from './actions'
import type { ThemeState } from './types'

const initialState: ThemeState = {
  borderRadius: 12,
  colorMode: 'light',
  drawerOpen: true,
  drawerWidth: 260,
  fontFamily: roboto.style.fontFamily,
}

const persistConfig = {
  blacklist: [],
  key: 'theme',
  storage,
  version: 1,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(setColorMode, (state, { payload }) => ({
      ...state,
      colorMode: payload,
    }))

    addCase(setDrawerOpen, (state, { payload }) => ({
      ...state,
      drawerOpen: payload,
    }))

    addCase(setDrawerWidth, (state, { payload }) => ({
      ...state,
      drawerWidth: payload,
    }))

    addCase(setFontFamily, (state, { payload }) => ({
      ...state,
      fontFamily: payload,
    }))

    addCase(setBorderRadius, (state, { payload }) => ({
      ...state,
      borderRadius: payload,
    }))
  },
})

export const themeReducer = persistReducer<ThemeState>(persistConfig, themeSlice.reducer)
