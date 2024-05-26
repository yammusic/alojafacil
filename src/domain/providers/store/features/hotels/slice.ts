'use client'

import { createSlice } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

import {
  setHotels,
  setRooms,
} from './actions'
import type { HotelsState } from './types'

const initialState: HotelsState = {
  hotels: [],
  rooms: [],
}

const persistConfig = {
  blacklist: [],
  key: 'hotels',
  storage,
  version: 1,
}

export const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(setHotels, (state, { payload }) => ({
      ...state,
      hotels: payload,
    }))

    addCase(setRooms, (state, { payload }) => ({
      ...state,
      rooms: payload,
    }))
  },
})

export const hotelsReducer = persistReducer<HotelsState>(persistConfig, hotelsSlice.reducer)
