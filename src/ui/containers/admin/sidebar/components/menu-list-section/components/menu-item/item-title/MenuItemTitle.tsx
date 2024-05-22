import React from 'react'
import { Typography } from '@mui/material'

import type { MenuItemTitleProps } from './props-types'

export function MenuItemTitle({ title, selected }: Readonly<MenuItemTitleProps>) {
  return (
    <Typography
      color="text.primary"
      fontWeight={ selected ? 'bold' : 'normal' }
      variant="body1"
    >
      { title }
    </Typography>
  )
}
