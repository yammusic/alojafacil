'use client'

import React, { useMemo } from 'react'
import { createTheme } from '@mui/material'

import { ThemeRegistry } from '../registry'
import type { ThemeProviderProps } from './props-types'

// import colors from '@/app/styles/_colors.module.scss'

/* Theme provider */
export function ThemeProvider({ children }: Readonly<ThemeProviderProps>) {
  const theme = useMemo(() => createTheme(), [])

  return (
    <ThemeRegistry theme={ theme }>
      { children }
    </ThemeRegistry>
  )
}
