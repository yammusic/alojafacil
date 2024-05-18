'use client'

import React, { useCallback } from 'react'
import { AppBar, Box, Toolbar, useTheme } from '@mui/material'

import { themeDrawerOpen, useThemeActions } from '@/domain/providers/store'
import {
  LogoSection,
  MenuSection,
  SearchSection,
  NotificationSection,
  LocaleSection,
  ProfileSection,
} from './components'

import styles from './styles.module.scss'

export function Header() {
  const { palette, breakpoints, transitions } = useTheme()
  const { setDrawerOpen } = useThemeActions()
  const drawerOpened = themeDrawerOpen()

  const onDrawerToggle = useCallback(() => {
    setDrawerOpen(!drawerOpened)
  }, [drawerOpened, setDrawerOpen])

  return (
    <AppBar
      enableColorOnDark
      color="inherit"
      elevation={ 0 }
      position="fixed"
      sx={ {
        bgcolor: palette.background.default,
        transition: drawerOpened ? transitions.create('width') : 'none',
      } }
    >
      <Toolbar>
        <Box
          className={ styles.toolbarLeft }
          sx={ {
            [breakpoints.down('md')]: {
              width: 'auto'
            }
          } }
        >
          <LogoSection />

          <MenuSection onPress={ onDrawerToggle } />
        </Box>

        {/* Search */}
        <SearchSection />

        <Box sx={ { flexGrow: 1 } } />

        <Box sx={ { flexGrow: 1 } } />

        {/* Locale */}
        <LocaleSection />

        {/* Notification */}
        <NotificationSection />

        <ProfileSection />
      </Toolbar>
    </AppBar>
  )
}
