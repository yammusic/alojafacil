import React from 'react'
import Image from 'next/image'
import { Box, Divider, Grid, Stack, Typography } from '@mui/material'

import { calculateTotalPrice } from '@/domain/utils'
import type { BookingCardProps } from './props-types'

export function BookingCard(props: Readonly<BookingCardProps>) {
  const { room, booking } = props

  return (
    <Grid container sx={ { p: 2, border: '1px solid #ccc', borderRadius: 'var(--border-radius)', overflow: 'hidden' } }>
      <Grid item pb={ 2 } xs={ 12 }>
        <Stack direction="row" gap={ 2 }>
          { !!room?.picture && (
            <Image
              priority
              alt="Room image"
              height={ 100 }
              src={ room?.picture ?? '' }
              style={ { objectFit: 'cover', borderRadius: 'var(--border-radius)' } }
              width={ 120 }
            />
          ) }

          <Box sx={ { display: 'flex', flexDirection: 'column', flex: 1 } }>
            <Typography variant="h6">
              { room?.hotel?.name }
            </Typography>

            <Typography variant="body1">
              { room?.type }
            </Typography>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={ 12 }>
        <Divider />
      </Grid>

      <Grid item py={ 2 } xs={ 12 }>
        <Typography gutterBottom variant="h6">
          Details
        </Typography>

        <Stack direction="row" sx={ { justifyContent: 'space-between', alignItems: 'center', pt: 1 } }>
          <Typography fontSize={ 16 } variant="subtitle2">
            Check in
          </Typography>

          <Typography variant="body1">
            { `${booking?.checkIn}` }
          </Typography>
        </Stack>

        <Stack direction="row" sx={ { justifyContent: 'space-between', alignItems: 'center', pt: 1 } }>
          <Typography fontSize={ 16 } variant="subtitle2">
            Check out
          </Typography>

          <Typography variant="body1">
            { `${booking?.checkOut}` }
          </Typography>
        </Stack>

        <Stack direction="row" sx={ { justifyContent: 'space-between', alignItems: 'center', pt: 1 } }>
          <Typography fontSize={ 16 } variant="subtitle2">
            Guests
          </Typography>

          <Typography variant="body1">
            { `${booking.adults} adult${(booking.adults ?? 1) > 1 ? 's' : ''}` }

            { !!booking.childrens && `, ${booking.childrens} child${booking.childrens > 1 ? 'rens' : ''}` }
          </Typography>
        </Stack>

        <Stack direction="row" sx={ { justifyContent: 'space-between', alignItems: 'center', pt: 1 } }>
          <Typography fontSize={ 16 } variant="subtitle2" />

          <Typography variant="body1">
            { `${booking?.nights} night${booking?.nights > 1 ? 's' : ''}, 1 room` }
          </Typography>
        </Stack>
      </Grid>

      <Grid item xs={ 12 }>
        <Divider />
      </Grid>

      <Grid item sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2 } } xs={ 12 }>
        <Typography variant="h6">
          Total
        </Typography>

        <Stack sx={ { alignItems: 'flex-end' } }>
          { !!room?.discount && (
          <>
            <Typography color="error" fontWeight="bold" variant="body1">
              { `${room?.discount}% off` }
            </Typography>

            <Typography sx={ { textDecoration: 'line-through' } } variant="body1">
              { `$${calculateTotalPrice(room?.basePrice, room?.taxes).toFixed(2)}` }
            </Typography>
          </>
                        ) }

          <Typography fontWeight="bold" variant="body1">
            { `$${calculateTotalPrice(room?.basePrice ?? 0, room?.taxes ?? 0, room?.discount).toFixed(2)}` }
          </Typography>

          <Typography variant="caption">includes taxes and fees</Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}
