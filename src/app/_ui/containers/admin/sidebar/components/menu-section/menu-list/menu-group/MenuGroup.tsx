'use client'

import React from 'react'
import { Divider, List, Typography, useTheme } from '@mui/material'
import { MenuCollapse } from '../menu-collapse'
import { MenuItem } from '../menu-item'

export function MenuGroup({ item }) {
  const theme = useTheme()

  return (
    <>
      <List
        subheader={
          item.title ? (
            <Typography
              gutterBottom
              display="block"
              sx={ { ...theme.typography.menuCaption } }
              variant="caption"
            >
              { item.title }

              { item.caption ? (
                <Typography
                  gutterBottom
                  display="block"
                  sx={ { ...theme.typography.subMenuCaption } }
                  variant="caption"
                >
                  { item.caption }
                </Typography>
              ) : null }
            </Typography>
          ) : null
        }
      >
        { item.children.map((menu) => {
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
