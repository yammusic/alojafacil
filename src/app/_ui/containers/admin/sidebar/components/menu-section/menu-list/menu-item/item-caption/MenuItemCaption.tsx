import React from 'react'
import { Typography } from '@mui/material'

import { useTheme } from '@/domain/providers'
import type { MenuItemCaptionProps } from './props-types'
import styles from './styles.module.scss'

export function MenuItemCaption({ caption }: Readonly<MenuItemCaptionProps>) {
  const { typography } = useTheme()
  if (!caption) { return null }


  return (
    <Typography
      gutterBottom
      display="block"
      sx={ { ...typography.subMenuCaption } }
      variant="caption"
    >
      { caption }
    </Typography>
  )
}
