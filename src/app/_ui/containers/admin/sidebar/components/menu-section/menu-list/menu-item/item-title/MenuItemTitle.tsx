import React from 'react'
import { Typography } from '@mui/material'

import type { MenuItemTitleProps } from './props-types'

export function MenuItemTitle({ title, selected }: Readonly<MenuItemTitleProps>) {
  return (
    <Typography
      color="inherit"
      variant={ selected ? 'h5' : 'body1' }
    >
      { title }
    </Typography>
  )
}
