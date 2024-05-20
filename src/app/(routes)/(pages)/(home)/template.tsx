import React from 'react'
import { Box } from '@mui/material'

import { Header, Footer } from '@/app/containers'
import { useSession } from '@/domain/hooks'

interface Props {
  children: React.ReactNode
}

export default function HomeTemplate({ children }: Readonly<Props>) {
  console.info('Header', typeof useSession())

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
