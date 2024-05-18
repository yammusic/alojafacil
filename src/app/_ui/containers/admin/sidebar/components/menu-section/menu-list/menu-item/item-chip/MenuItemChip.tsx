import React from 'react'
import { Avatar, Chip } from '@mui/material'

import type { MenuItemChipProps } from './props-types'

export function MenuItemChip({ chip }: Readonly<MenuItemChipProps>) {
  const { color, label, size, variant, avatar } = chip ?? {}
  if (!chip) { return null }

  return (
    <Chip
      avatar={ avatar ? <Avatar>{avatar}</Avatar> : undefined }
      color={ color }
      label={ label }
      size={ size }
      variant={ variant }
    />
  )
}
