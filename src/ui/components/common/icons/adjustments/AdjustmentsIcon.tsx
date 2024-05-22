import React from 'react'
import { IconButton, useTheme } from '@mui/material'
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2'

import type { AdjustmentsIconProps } from './props-types'

export function AdjustmentsIcon(props: Readonly<AdjustmentsIconProps>) {
  const { color, onPress, size, ...rest } = props
  const { palette } = useTheme()

  const defaultSize = 24
  const defaultColor = palette.grey[500]

  return (
    <IconButton
      aria-label="adjustments"
      onClick={ onPress }
      { ...rest }
    >
      <HiOutlineAdjustmentsHorizontal
        color={ color ?? defaultColor }
        size={ size ?? defaultSize }
      />
    </IconButton>
  )
}
