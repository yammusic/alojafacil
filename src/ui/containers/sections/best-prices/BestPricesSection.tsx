'use client'

import React, { useEffect, useMemo } from 'react'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'

import type { Room } from '@/domain/db/features/Room/model'
import { roomsData, useHotelsActions } from '@/domain/providers/store'
import { calculateTotalPrice } from '@/domain/utils/price'
import { fetchRooms } from '@/infra/services'
import styles from './styles.module.scss'

export function BestPricesSection() {
  const { setRooms } = useHotelsActions()
  const rooms = roomsData()

  const loadRooms = async() => {
    const { content: { data } } = await fetchRooms()
    setRooms(data as any)
  }

  useEffect(() => { loadRooms() }, [])

  const sortByBestPrice = (rooms: Room[]): Room[] => {
    return rooms.slice().sort((a, b) => {
      const totalPriceA = calculateTotalPrice(a.basePrice, a.taxes, a.discount)
      const totalPriceB = calculateTotalPrice(b.basePrice, b.taxes, b.discount)
      return totalPriceA - totalPriceB
    }).filter((room) => room?.basePrice > 0)
  }

  const sortedRooms = useMemo(() => sortByBestPrice(rooms), [rooms])
  console.info({ rooms })

  return (
    <Grid container className={ styles.container } component="section">
      <Container>
        <Grid item className={ styles.titleContainer } xs={ 12 }>
          <Typography className={ styles.title } variant="h5">
            Best room prices
          </Typography>
        </Grid>

        <Grid item xs={ 12 }>
          <Stack useFlexGap className={ styles.cardsContainer }>
            { sortedRooms.slice(0, 8).map((room) => {
              const totalPrice = calculateTotalPrice(room?.basePrice, room?.taxes, room?.discount)

              return (
                <Card className={ styles.card } key={ room?.type }>
                  <CardActionArea className={ styles.cardActionArea }>
                    <CardMedia
                      alt={ room?.type }
                      className={ styles.cardMedia }
                      component="img"
                      image={ room?.picture }
                      loading="lazy"
                    />

                    <CardContent className={ styles.cardContent }>
                      <Typography noWrap variant="h6">
                        { room?.hotel?.name }
                      </Typography>

                      <Typography gutterBottom noWrap variant="body2">
                        { room?.type }
                      </Typography>

                      <Box className={ styles.priceContainer }>
                        <Stack alignItems={ 'center' } direction="row" gap={ 0.5 }>
                          <Typography className={ styles.totalPrice } fontWeight="bold" variant="subtitle1">
                            { `$${totalPrice.toFixed(2)}` }
                          </Typography>

                          <Typography sx={ { textDecoration: 'line-through' } } variant="body2">
                            { `$${room?.basePrice.toFixed(2)}` }
                          </Typography>

                          { !!room?.discount && (
                            <Typography className={ styles.discount } variant="body2">
                              { `-${room?.discount}%` }
                            </Typography>
                          ) }
                        </Stack>

                        <Typography fontSize={ 12 } variant="body2">per night</Typography>

                        <Typography fontSize={ 12 } variant="body2">includes taxes and fees</Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              )
            }) }
          </Stack>
        </Grid>
      </Container>
    </Grid>
  )
}
