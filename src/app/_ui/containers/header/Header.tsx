'use client'

import React from 'react'
import {
  AppBar,
  Box,
  Container,
  Stack,
  Toolbar,
  useTheme,
} from '@mui/material'

import { LogoSection, ProfileSection } from './components'
import styles from './styles.module.scss'

export function Header() {
  const { palette } = useTheme()

  return (
    <AppBar
      className={ styles.header }
      elevation={ 1 }
      sx={ {
        bgcolor: palette.background.default,
        // borderBottomColor: palette.divider,
      } }
    >
      <Container>
        <Toolbar>
          <Box className={ styles.toolbarLeft }>
            <LogoSection />
          </Box>

          <Box sx={ { flexGrow: 1 } } />

          <Box sx={ { flexGrow: 1 } } />

          <Stack className={ styles.toolbarRight }>
            {/* Locale */}
            {/* <LocaleSection /> */}

            <ProfileSection />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
