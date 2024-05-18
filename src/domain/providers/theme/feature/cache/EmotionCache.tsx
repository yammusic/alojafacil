'use client'

import React, { useMemo } from 'react'
import createCache from '@emotion/cache'
import { useServerInsertedHTML } from 'next/navigation'
import { CacheProvider as DefaultCacheProvider } from '@emotion/react'

import type { NextAppDirEmotionCacheProviderProps } from './props-types'

// Adapted from https://github.com/garronej/tss-react/blob/main/src/next/appDir.tsx
export function NextAppDirEmotionCacheProvider(props: Readonly<NextAppDirEmotionCacheProviderProps>) {
  const { options, CacheProvider = DefaultCacheProvider, children } = props

  const registry = useMemo(() => {
    const cache = createCache(options)
    cache.compat = true

    const prevInsert = cache.insert
    let inserted: { name: string; isGlobal: boolean }[] = []

    cache.insert = (...args) => {
      const [selector, serialized] = args

      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({
          name: serialized.name,
          isGlobal: !selector,
        })
      }

      return prevInsert(...args)
    }

    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }

    return { cache, flush }
  }, [options])

  useServerInsertedHTML(() => {
    const inserted = registry.flush()
    if (inserted.length === 0) { return null }

    let styles = ''
    let dataEmotionAttribute = registry.cache.key

    const globals: {
      name: string;
      style: string;
    }[] = []

    inserted.forEach(({ name, isGlobal }) => {
      const style = registry.cache.inserted[name]

      if (typeof style !== 'boolean') {
        if (isGlobal) {
          globals.push({ name, style })
        } else {
          styles += style
          dataEmotionAttribute += ` ${name}`
        }
      }
    })

    return (
      <>
        { globals.map(({ name, style }) => (
          <style
            dangerouslySetInnerHTML={ { __html: style } }
            data-emotion={ `${registry.cache.key}-global ${name}` }
            key={ name }
          />
        )) }

        { !!styles && (
          <style
            dangerouslySetInnerHTML={ { __html: styles } }
            data-emotion={ dataEmotionAttribute }
          />
        ) }
      </>
    )
  })

  return (
    <CacheProvider value={ registry.cache }>
      { children }
    </CacheProvider>
  )
}
