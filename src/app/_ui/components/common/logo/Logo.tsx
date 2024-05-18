import React from 'react'
import Image from 'next/image'

import type { LogoProps } from './props-types'

import logoSrc from '@/assets/images/logo.webp'

const defaultSize = 500

export function Logo(props: Readonly<LogoProps>) {
  const {
    height,
    size,
    width,
    ...rest
  } = props ?? {}

  return (
    <Image
      alt="Logo"
      height={ (size ?? height ?? defaultSize) }
      src={ logoSrc }
      width={ (size ?? width ?? defaultSize) }
      { ...rest }
    />
  )
}
