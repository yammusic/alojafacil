'use client'

import React, { useCallback } from 'react'
import { AppBar, Box, Toolbar, useMediaQuery, useTheme } from '@mui/material'

import { DRAWER_WIDTH, DRAWER_WIDTH_SMALL } from '@/domain/constants'
import { themeDrawerOpen, themeDrawerWidth, useThemeActions } from '@/domain/providers/store'
import { ProfileSection, LogoSection } from '../../header/components'
import { MenuSection } from './components'
import styles from './styles.module.scss'

export function Header() {
  const { palette, breakpoints, transitions } = useTheme()
  const matchUpMd = useMediaQuery(breakpoints.up('md'))

  const { setDrawerOpen, setDrawerWidth } = useThemeActions()
  const drawerOpened = themeDrawerOpen()
  const drawerWidth = themeDrawerWidth()

  const onDrawerToggle = useCallback(() => {
    if (matchUpMd && drawerOpened) {
      setDrawerWidth((
        drawerWidth === DRAWER_WIDTH
          ? DRAWER_WIDTH_SMALL
          : DRAWER_WIDTH
      ))
    } else {
      if (!matchUpMd) {
        setDrawerWidth(DRAWER_WIDTH)
      }
      setDrawerOpen(!drawerOpened)
    }
  }, [drawerOpened, matchUpMd, drawerWidth])

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
          <Box sx={ { display: { xs: 'none', md: 'flex' } } }>
            <LogoSection />
          </Box>

          <MenuSection onPress={ onDrawerToggle } />
        </Box>

        <Box sx={ { flexGrow: 1 } } />

        <Box sx={ { flexGrow: 1 } } />

        {/* Locale */}
        {/* <LocaleSection /> */}

        {/* Notification */}
        {/* <NotificationSection /> */}

        <ProfileSection admin />
      </Toolbar>
    </AppBar>
  )
}
