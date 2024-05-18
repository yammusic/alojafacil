import React from 'react'
import type { Metadata } from 'next'
import { Container } from '@mui/material'

export const metadata: Metadata = {
  title: 'Aloja Fácil - Auth',
}

interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Readonly<Props>) {
  return (
    <Container component="main" maxWidth="sm">
      { children }
    </Container>
  )
}
