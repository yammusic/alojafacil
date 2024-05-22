import React from 'react'
import { IconButton, useTheme } from '@mui/material'
import { MdSearch } from 'react-icons/md'

import type { SearchIconProps } from './props-types'

export function SearchIcon(props: Readonly<SearchIconProps>) {
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
      <MdSearch
        color={ color ?? defaultColor }
        size={ size ?? defaultSize }
      />
    </IconButton>
  )
}
