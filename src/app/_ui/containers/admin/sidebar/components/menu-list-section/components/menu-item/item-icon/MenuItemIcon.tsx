import React from 'react'
import { ListItemIcon } from '@mui/material'
import { MdFiberManualRecord } from 'react-icons/md'

import type { MenuItemIconProps } from './props-types'

export function MenuItemIcon({ icon: Icon, level }: Readonly<MenuItemIconProps>) {
  const styles = {
    my: 'auto',
    minWidth: !Icon ? 18 : 36,
  }

  return (
    <ListItemIcon sx={ styles }>
      { Icon ? (
        <Icon size={ 20 } />
      ) : (
        <MdFiberManualRecord
          data-testid="default-icon"
          fontSize={ level > 0 ? 'inherit' : 'medium' }
          size={ 6 }
        />
      ) }
    </ListItemIcon>
  )
}
