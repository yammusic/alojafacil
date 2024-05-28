import React from 'react'
import { Box } from '@mui/material'

import { Footer, Header, HotelResultsSection } from '@/app/containers'
import styles from './styles.module.scss'

interface Props {
  params: Record<string, string>
  searchParams: Record<string, string>
}

export default async function Search(props: Readonly<Props>) {
  const { searchParams } = props

  return (
    <>
      <Header />

      <Box className={ styles.main } component="main">
        <HotelResultsSection filters={ searchParams }  />
      </Box>

      <Footer />
    </>
  )
}
