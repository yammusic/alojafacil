/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { redirect } from 'next/navigation'
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Rating, Stack, Typography } from '@mui/material'

import { Footer, GallerySection, Header, HotelDetailsSection, HotelReviewsSection, HotelRoomsSection } from '@/app/containers'
import { getHotel, getUsers } from '@/domain/db'
import styles from './styles.module.scss'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { calculateTotalPrice } from '@/domain/utils'
import Image from 'next/image'
import { GoDot } from 'react-icons/go'

type Props = {
  params: { id: string }
}

export default async function Hotel({ params }: Readonly<Props>) {
  const { id } = params
  const hotel = await getHotel({ id })
  if (!hotel) { return redirect('/') }
  const users = await getUsers()
  console.log({ hotel })

  return (
    <>
      <Header />

      <Box className={ styles.main } component="main">
        <GallerySection images={ hotel?.images?.split('; ') ?? [] } />

        <HotelDetailsSection hotel={ hotel } />

        <HotelRoomsSection hotel={ hotel } />

        <HotelReviewsSection hotel={ hotel } users={ users } />
      </Box>

      <Footer />
    </>
  )
}
