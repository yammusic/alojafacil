import React from 'react'
import NextLink from 'next/link'
import { Link as MuiLink } from '@mui/material'

import type { LinkProps } from './props-types'
import styles from './styles.module.scss'

export function Link(props: Readonly<LinkProps>) {
  const { children, href, ...rest } = props

  return (
    <NextLink href={ href }>
      <MuiLink
        className={ styles.link }
        component="span"
        { ...rest }
      >
        { children }
      </MuiLink>
    </NextLink>
  )
}
