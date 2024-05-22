'use client'

import React from 'react'
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'

import type { LocalizationProviderProps } from './props-types'

export function LocalizationProvider({ children }: Readonly<LocalizationProviderProps>) {
  return (
    <MuiLocalizationProvider dateAdapter={ AdapterLuxon }>
      { children }
    </MuiLocalizationProvider>
  )
}
