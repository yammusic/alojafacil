'use client'

import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import '@/domain/polyfills'

import { StoreProvider, ThemeProvider } from '@/domain/providers'
import { TopLoader } from '@/app/containers'

import type { AppLayoutProps } from './props-types'
import '@/app/styles/globals.scss'

export function AppLayout({ children }: Readonly<AppLayoutProps>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <StoreProvider>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={ AdapterLuxon }>
              <TopLoader />

              { children }
            </LocalizationProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
