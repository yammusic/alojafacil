'use client'

import React, { useCallback, useEffect } from 'react'
import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material'

import { themeDrawerOpen, themeDrawerWidth, useThemeActions } from '@/domain/providers/store'
import { MenuListSection } from './components'

import styles from './styles.module.scss'

export function Sidebar() {
  const { palette, breakpoints, transitions } = useTheme()
  const matchUpMd = useMediaQuery(breakpoints.up('md'))

  const { setDrawerOpen } = useThemeActions()
  const drawerOpened = themeDrawerOpen()
  const drawerWidth = themeDrawerWidth()

  const onDrawerClose = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  useEffect(() => {
    if (!matchUpMd) {
      setDrawerOpen(false)
    } else {
      setDrawerOpen(true)
    }
  }, [matchUpMd])

  return (
    <Box
      aria-label="sidebar"
      component="nav"
      sx={ {
        flexShrink: { md: 0 },
        width: matchUpMd ? drawerWidth : 'auto',
      } }
    >
      <Drawer
        ModalProps={ { keepMounted: true } }
        anchor="left"
        className={ styles.drawer }
        color="inherit"
        container={ document.body }
        onClose={ onDrawerClose }
        open={ drawerOpened }
        sx={ {
          '& .MuiDrawer-paper': {
            py: 2,
            width: drawerWidth,
            transition: transitions.create('width'),
            background: palette.background.default,
            color: palette.text.primary,
            borderRight: 'none',

            [breakpoints.up('md')]: {
              top: '64px'
            }
          }
        } }
        variant={ matchUpMd ? 'persistent' : 'temporary' }
      >
        <MenuListSection />
      </Drawer>
    </Box>
  )
}
