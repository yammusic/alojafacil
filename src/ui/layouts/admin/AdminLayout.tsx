'use client'

import React from 'react'
import { Box, Container, useTheme } from '@mui/material'
import '@/domain/polyfills'

import { Header, Sidebar } from '@/app/containers/admin'
import { themeDrawerWidth } from '@/domain/providers/store'
import type { AdminLayoutProps } from './props-types'
import styles from './styles.module.scss'

export function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
  const { breakpoints, transitions } = useTheme()
  const drawerWidth = themeDrawerWidth()

  return (
    <>
      <Header />

      <Sidebar />

      <Box
        className={ styles.main }
        component="main"
        sx={ {
          marginLeft: { xs: 0, md: `${drawerWidth}px` },
          transition: transitions.create('margin'),
          [breakpoints.down('md')]: {
            borderRadius: 0,
          },
        } }
      >
        <Container className={ styles.container } maxWidth="xl">
          { children }
        </Container>
      </Box>
    </>
  )
}
