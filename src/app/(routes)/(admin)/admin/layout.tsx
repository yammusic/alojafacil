import React from 'react'
import { Container } from '@mui/material'
import type { Metadata } from 'next'

import { AppLayout } from '@/app/layouts'
import {
  Header,
  Sidebar,
  TopLoader,
} from '@/app/containers'

export const metadata: Metadata = {
  title: 'Fresh - Admin Blank > Dashboard',
  description: 'NextJS Frontend admin blank template',
}

interface Props {
  children: React.ReactNode
}

export default function AdminLayout({ children }: Readonly<Props>) {
  return (
    <AppLayout>
      <TopLoader />

      <Header />

      <Sidebar />

      <Container component="main">
        { children }
      </Container>
    </AppLayout>
  )
}
