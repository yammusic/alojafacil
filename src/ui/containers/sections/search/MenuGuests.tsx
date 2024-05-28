import { Box, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import React from 'react'
import { FaMinus } from 'react-icons/fa6'
import { IoAdd } from 'react-icons/io5'

import type { MenuGuestsProps } from './props-types'
import styles from './styles.module.scss'

export function MenuGuests(props: Readonly<MenuGuestsProps>) {
  const {
    anchorEl,
    onClose,
    onIncrementAdults,
    onDecrementAdults,
    onIncrementChildren,
    onDecrementChildren,
    adults,
    childrens,
  } = props

  return (
    <Menu
      anchorEl={ anchorEl as Element }
      onClose={ onClose }
      open={ Boolean(anchorEl) }
    >
      <MenuItem>
        <Box className={ styles.menuItem }>
          <Typography>Adults</Typography>

          <Stack direction="row" sx={ { alignItems: 'center', gap: 1 } }>
            <IconButton onClick={ onDecrementAdults } size="small">
              <FaMinus />
            </IconButton>

            <Typography>{adults}</Typography>

            <IconButton onClick={ onIncrementAdults } size="small">
              <IoAdd />
            </IconButton>
          </Stack>
        </Box>
      </MenuItem>

      <MenuItem>
        <Box className={ styles.menuItem }>
          <Typography>Childrens</Typography>

          <Stack direction="row" sx={ { alignItems: 'center', gap: 1 } }>
            <IconButton onClick={ onDecrementChildren } size="small">
              <FaMinus />
            </IconButton>

            <Typography>{childrens}</Typography>

            <IconButton onClick={ onIncrementChildren } size="small">
              <IoAdd />
            </IconButton>
          </Stack>
        </Box>
      </MenuItem>
    </Menu>
  )
}
