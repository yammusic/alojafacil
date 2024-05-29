import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import { DateTime } from 'luxon'

import { Header } from '@/app/containers/header/Header'
import { Footer } from '@/app/containers/footer/Footer'
import { BookingCard } from '@/app/containers/booking-card/BookingCard'
import { BookingForm } from '@/app/containers/forms/booking/BookingForm'
import { getRoom } from '@/domain/db/features/Room/service'
import type { FilterFormValues } from '@/app/containers/sections/filter/props-types'
import styles from './styles.module.scss'

interface Props {
  params: {
    roomId: string
  }

  searchParams: Partial<FilterFormValues>
}

export default async function Booking(props: Readonly<Props>) {
  const { params, searchParams } = props
  const { roomId } = params

  const room = await getRoom({ id: Number(roomId) })
  const checkIn = DateTime.fromISO(searchParams.checkIn as any)
  const checkOut = DateTime.fromISO(searchParams.checkOut as any)
  const adults = Number(searchParams.adults)
  const childrens = Number(searchParams.childrens)
  const totalNights = checkOut.diff(checkIn, 'days').days

  return (
    <>
      <Header />

      <Box className={ styles.main } component="main">
        <Container>
          <Grid container px={ 2 } py={ 4 }>
            <Grid item mb={ 4 } xs={ 12 }>
              <Typography component="h1" variant="h4">
                Booking
              </Typography>
            </Grid>

            <Grid item xs={ 12 }>
              <Grid container>
                <Grid
                  item
                  md={ 8 }
                  pr={ { md: 4, xs: 0 } }
                  xs={ 12 }
                >
                  <BookingForm
                    booking={ {
                      adults,
                      childrens,
                      roomId: Number(roomId),
                      checkIn: checkIn.toJSDate(),
                      checkOut: checkOut.toJSDate(),
                    } }
                  />
                </Grid>

                <Grid item md={ 4 } xs={ 12 }>
                  <BookingCard
                    booking={ {
                      checkIn: checkIn.toISODate() as string,
                      checkOut: checkOut.toISODate() as string,
                      adults,
                      childrens,
                      nights: totalNights,
                    } }
                    room={ room ?? ({} as any) }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </>
  )
}
