import React from 'react'
import Typography from '@mui/material/Typography'
import type { TypographyProps } from '@mui/material/Typography'

import styles from './styles.module.scss'

export function Text(props: Readonly<TypographyProps>) {
  const {
    children,
    className = '',
    variant = 'body1',
    ...rest
  } = props ?? {}

  return (
    <Typography
      className={ `${styles.typographyText} ${className}` }
      variant={ variant ?? 'body1' }
      { ...rest }
    >
      { children }
    </Typography>
  )
}
