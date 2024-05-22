'use client'

import { bindActionCreators } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '../../shared/hooks'
import {
  setHotels,
} from './actions'

import type { RootState } from '../../shared/types'
import type { HotelsState } from './types'

/* Selectors */
export const useHotelsState = (): HotelsState => (
  useSelector(({ hotels }: RootState) => hotels)
)

export const hotelsData = () => useHotelsState().hotels

/* Actions */
export const useHotelsActions = () => ({
  ...bindActionCreators({
    setHotels,
  }, useAppDispatch()),
})
