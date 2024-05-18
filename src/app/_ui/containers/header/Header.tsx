'use client'

import React from 'react'
import { AppBar, Box, Button, Container, Stack, Toolbar, useTheme } from '@mui/material'

import {
  LogoSection,
} from './components'

import styles from './styles.module.scss'
import Link from 'next/link'

export function Header() {
  const { palette } = useTheme()

  return (
    <AppBar
      className={ styles.header }
      elevation={ 0 }
      sx={ {
        bgcolor: palette.background.default,
        borderBottomColor: palette.divider,
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

            <Link href="/auth/sign-up">
              <Button sx={ { textTransform: 'capitalize' } } variant="text">Sign Up</Button>
            </Link>

            <Link href="/auth/sign-in">
              <Button sx={ { textTransform: 'capitalize' } } variant="contained">Sign In</Button>
            </Link>

            {/* <ProfileSection /> */}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
