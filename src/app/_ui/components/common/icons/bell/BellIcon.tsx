import React from 'react'
import { IconButton, useTheme } from '@mui/material'
import { FaRegBell } from 'react-icons/fa6'

import type { BellIconProps } from './props-types'

export function BellIcon(props: Readonly<BellIconProps>) {
  const { color, onPress, size, ...rest } = props
  const { palette } = useTheme()

  const defaultSize = 24
  const defaultColor = palette.grey[500]

  return (
    <IconButton
      aria-label="search"
      onClick={ onPress }
      { ...rest }
    >
      <FaRegBell
        color={ color ?? defaultColor }
        size={ size ?? defaultSize }
      />
    </IconButton>
  )
}
