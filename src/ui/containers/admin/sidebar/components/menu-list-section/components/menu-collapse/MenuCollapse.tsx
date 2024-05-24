/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react'
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { MdFiberManualRecord } from 'react-icons/md'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

import { themeBorderRadius } from '@/domain/providers/store'
import { useTheme } from '@/domain/providers/theme'
import type { MenuCollapseProps } from './props-types'

export function MenuCollapse({ menu, level }: Readonly<MenuCollapseProps>) {
  const { palette, typography } = useTheme()
  const borderRadius = `${themeBorderRadius()}px`


  const [selected, setSelected] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)


  return (
    <>
      <ListItemButton
        // onClick={ handleClick }
        selected={ selected === menu.id }
        sx={ {
          borderRadius,
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 24}px`
        } }
      >
        <ListItemIcon sx={ { my: 'auto', minWidth: !menu.icon ? 18 : 36 } }>
          { !menu.icon ? <MdFiberManualRecord /> : menu.icon }
        </ListItemIcon>

        <ListItemText
          primary={
            <Typography color="inherit" sx={ { my: 'auto' } } variant={ selected === menu.id ? 'h5' : 'body1' }>
              { menu.title }
            </Typography>
          }
          secondary={
            menu.caption ? (
              <Typography
                gutterBottom
                display="block"
                // sx={ { ...typography.subMenuCaption } }
                variant="caption"
              >
                { menu.caption }
              </Typography>
            ) : null
          }
        />

        { open ? (
          <FaChevronUp size="1rem" style={ { marginTop: 'auto', marginBottom: 'auto' } } />
        ) : (
          <FaChevronDown size="1rem" style={ { marginTop: 'auto', marginBottom: 'auto' } } />
        )}
      </ListItemButton>

      <Collapse unmountOnExit in={ open } timeout="auto">
        <List
          disablePadding
          component="div"
          sx={ {
            position: 'relative',
            '&:after': {
              content: '\'\'',
              position: 'absolute',
              left: '32px',
              top: 0,
              height: '100%',
              width: '1px',
              opacity: 1,
              background: palette.primary.light
            }
          } }
        >
          {/* {menus} */}
        </List>
      </Collapse>
    </>
  )
}
