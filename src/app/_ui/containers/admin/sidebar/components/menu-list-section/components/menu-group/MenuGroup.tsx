'use client'

import React from 'react'
import { Divider, List, Typography } from '@mui/material'

import { DRAWER_WIDTH_SMALL } from '@/domain/constants'
import { themeDrawerWidth } from '@/domain/providers'
import { MenuCollapse } from '../menu-collapse'
import { MenuItem } from '../menu-item'
import type { MenuGroupProps } from './props-types'

export function MenuGroup({ item }: Readonly<MenuGroupProps>) {
  const drawerWidth = themeDrawerWidth()
  const isSmallDrawer = drawerWidth == DRAWER_WIDTH_SMALL

  return (
    <>
      <List
        subheader={
          (item.title && !isSmallDrawer) ? (
            <Typography gutterBottom variant="subtitle2">
              { item.title }

              { item.caption ? (
                <Typography gutterBottom variant="caption">
                  { item.caption }
                </Typography>
              ) : null }
            </Typography>
          ) : null
        }
      >
        { item.children?.map((menu) => {
          if (menu.type === 'collapse') {
            return <MenuCollapse key={ menu.id } level={ 1 } menu={ menu } />
          }

          if (menu.type === 'item') {
            return <MenuItem item={ menu } key={ menu.id } level={ 1 } />
          }

          return (
            <Typography
              align="center"
              color="error"
              key={ menu.id }
              variant="h6"
            >
              Menu Items Error
            </Typography>
          )
        } )}
      </List>

      {/* group divider */}
      <Divider sx={ { mt: 0.25, mb: 1.25 } } />
    </>
  )
}
