import React from 'react'
import { redirect } from 'next/navigation'
import { Box } from '@mui/material'

import type { FilterFormValues } from '@/app/containers'
import { Footer, GallerySection, Header, HotelDetailsSection, HotelReviewsSection, HotelRoomsSection } from '@/app/containers'
import { getHotel, getUsers } from '@/domain/db'
import styles from './styles.module.scss'

type Props = {
  params: { id: string }
  searchParams: Partial<FilterFormValues>
}

export default async function Hotel(props: Readonly<Props>) {
  const { params, searchParams } = props
  const { id } = params

  const hotel = await getHotel({ id })
  if (!hotel) { return redirect('/') }
  const users = await getUsers()

  return (
    <>
      <Header />

      <Box className={ styles.main } component="main">
        <GallerySection images={ hotel?.images?.split('; ') ?? [] } />

        <HotelDetailsSection hotel={ hotel } />

        <HotelRoomsSection filters={ searchParams } hotel={ hotel } />

        <HotelReviewsSection hotel={ hotel } users={ users } />
      </Box>

      <Footer />
    </>
  )
}
