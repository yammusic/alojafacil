import React from 'react'
import { IconButton, useTheme } from '@mui/material'
import { MdOutlineTranslate } from 'react-icons/md'

import type { TranslateIconProps } from './props-types'

export function TranslateIcon(props: Readonly<TranslateIconProps>) {
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
      <MdOutlineTranslate
        color={ color ?? defaultColor }
        size={ size ?? defaultSize }
      />
    </IconButton>
  )
}
