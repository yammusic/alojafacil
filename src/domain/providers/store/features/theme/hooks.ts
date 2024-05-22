'use client'

import { bindActionCreators } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '../../shared/hooks'
import {
  setBorderRadius,
  setColorMode,
  setDrawerOpen,
  setDrawerWidth,
  setFontFamily,
} from './actions'

import type { RootState } from '../../shared/types'
import type { ThemeState } from './types'

/* Selectors */
export const useThemeState = (): ThemeState => (
  useSelector(({ theme }: RootState) => theme)
)

export const themeBorderRadius = () => useThemeState().borderRadius

export const themeColorMode = () => useThemeState().colorMode

export const themeDrawerOpen = () => useThemeState().drawerOpen

export const themeDrawerWidth = () => useThemeState().drawerWidth

export const themeFontFamily = () => useThemeState().fontFamily

/* Actions */
export const useThemeActions = () => ({
  ...bindActionCreators({
    setBorderRadius,
    setColorMode,
    setDrawerOpen,
    setDrawerWidth,
    setFontFamily,
  }, useAppDispatch()),
})
