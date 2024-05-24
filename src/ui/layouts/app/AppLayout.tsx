import React from 'react'
import '@/domain/polyfills'

import { LocalizationProvider } from '@/domain/providers/localization'
import { StoreProvider } from '@/domain/providers/store'
import { ThemeProvider } from '@/domain/providers/theme'
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
