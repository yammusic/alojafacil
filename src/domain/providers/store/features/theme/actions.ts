'use client'

import { createAction } from '@reduxjs/toolkit'
import type { ThemeColorMode } from '@/domain/providers/theme'

export const setColorMode = createAction<ThemeColorMode>('@theme/SET_COLOR_MODE')
export const setDrawerOpen = createAction<boolean>('@theme/SET_DRAWER_OPEN')
export const setDrawerWidth = createAction<number>('@theme/SET_DRAWER_WIDTH')
export const setFontFamily = createAction<string>('@theme/SET_FONT_FAMILY')
export const setBorderRadius = createAction<number>('@theme/SET_BORDER_RADIUS')
