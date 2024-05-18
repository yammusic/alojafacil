'use client'

import React, { useCallback, useEffect } from 'react'
import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material'

import { themeDrawerOpen, themeDrawerWidth, useThemeActions } from '@/domain/providers'
import { MenuSection } from './components/menu-section'

export function Sidebar() {
  const { palette, breakpoints } = useTheme()
  const matchDownMd = useMediaQuery(breakpoints.down('md'))
  const matchUpMd = useMediaQuery(breakpoints.up('md'))

  const { setDrawerOpen } = useThemeActions()
  const drawerOpened = themeDrawerOpen()
  const drawerWidth = themeDrawerWidth()

  const onDrawerToggle = useCallback(() => {
    setDrawerOpen(!drawerOpened)
  }, [drawerOpened, setDrawerOpen])

  useEffect(() => {
    if (matchDownMd) {
      setDrawerOpen(false)
    } else {
      setDrawerOpen(true)
    }
  }, [matchDownMd])

  return (
    <Box
      aria-label="mailbox folders"
      component="nav"
      sx={ {
        flexShrink: { md: 0 },
        width: matchUpMd ? drawerWidth : 'auto',
      } }
    >
      <Drawer
        ModalProps={ { keepMounted: true } }
        anchor="left"
        color="inherit"
        onClose={ onDrawerToggle }
        open={ drawerOpened }
        sx={ {
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: palette.background.default,
            color: palette.text.primary,
            borderRight: 'none',
            [breakpoints.up('md')]: {
              top: '88px'
            }
          }
        } }
        variant={ matchUpMd ? 'persistent' : 'temporary' }
      >
        <MenuSection />
      </Drawer>
    </Box>
  )
}
