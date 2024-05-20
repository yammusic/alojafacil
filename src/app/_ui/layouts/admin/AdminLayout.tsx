'use client'

import React from 'react'
import { Box, Container } from '@mui/material'

import { Header, Sidebar } from '@/app/containers/admin'
import { themeDrawerWidth } from '@/domain/providers'
import type { AdminLayoutProps } from './props-types'
import styles from './styles.module.scss'

export function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
  const drawerWidth = themeDrawerWidth()

  return (
    <>
      <Header />

      <Sidebar />

      <Box
        className={ styles.main }
        component="main"
        sx={ {
          marginTop: 8,
          marginLeft: { xs: 0, md: `${drawerWidth}px` },
        } }
      >
        <Container className={ styles.container }>
          { children }
        </Container>
      </Box>
    </>
  )
}
