import React from 'react'
import { Box } from '@mui/material'

import { Header, Footer } from '@/app/containers'

interface Props {
  children: React.ReactNode
}

export default function HomeTemplate({ children }: Readonly<Props>) {
  return (
    <>
      <Header />

      <Box component="main" mt={ 8 }>
        { children }
      </Box>

      <Footer />
    </>
  )
}
