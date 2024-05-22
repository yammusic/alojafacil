import React from 'react'
import '@/domain/polyfills'

import {
  LocalizationProvider,
  StoreProvider,
  ThemeProvider,
} from '@/domain/providers'
import { TopLoader } from '@/app/containers'
import { isDev } from '@/domain/utils'

import type { AppLayoutProps } from './props-types'
import '@/app/styles/globals.scss'

export function AppLayout({ children }: Readonly<AppLayoutProps>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <StoreProvider isDev={ isDev() }>
          <ThemeProvider>
            <LocalizationProvider>
              <TopLoader />

              { children }
            </LocalizationProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
