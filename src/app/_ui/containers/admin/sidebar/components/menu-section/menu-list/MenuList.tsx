import React from 'react'
import { Box, Typography } from '@mui/material'

import { appSidebarMenu } from '@/domain/providers'
import { MenuGroup } from './menu-group'

export function MenuList() {
  const menuItems = appSidebarMenu()

  return (
    <Box>
      { menuItems.map((item) => {
        if (item.type === 'group') {
          return <MenuGroup item={ item } key={ item.id } />
        }

        return (
          <Typography
            align="center"
            color="error"
            key={ item.id }
            variant="h6"
          >
            Menu Items Error
          </Typography>
        )
      } )}
    </Box>
  )
}
