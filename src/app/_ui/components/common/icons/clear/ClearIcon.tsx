import { IconButton, useTheme } from '@mui/material'
import React from 'react'
import { MdClose } from 'react-icons/md'

import type { ClearIconProps } from './props-types'

export function ClearIcon(props: Readonly<ClearIconProps>) {
  const { color, onPress, size, ...rest } = props
  const { palette } = useTheme()

  const defaultSize = 24
  const defaultColor = palette.grey[500]

  return (
    <IconButton
      aria-label="clear"
      onClick={ onPress }
      { ...rest }
    >
      <MdClose
        color={ color ?? defaultColor }
        size={ size ?? defaultSize }
      />
    </IconButton>
  )
}
