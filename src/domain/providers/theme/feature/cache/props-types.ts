import type { JSX, ReactNode } from 'react'
import type { EmotionCache, Options as OptionsOfCreateCache } from '@emotion/cache'

export type CacheProviderProps = {
  value: EmotionCache,
  children: ReactNode,
}

export type NextAppDirEmotionCacheProviderProps = {
  /** This is the options passed to createCache() from 'import createCache from "@emotion/cache"' */
  options: Omit<OptionsOfCreateCache, 'insertionPoint'>,
  /** By default <CacheProvider /> from 'import { CacheProvider } from "@emotion/react"' */
  CacheProvider?: (props: CacheProviderProps) => JSX.Element | null,
  children: ReactNode,
}
