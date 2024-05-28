'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'

import { Rating } from '@/app/components'
import { calculateAverageRating } from '@/domain/utils/rating'
import { calculateTotalPrice } from '@/domain/utils/price'
import { useHotelsActions, useHotelsState } from '@/domain/providers/store'

import { FilterSection } from '../filter'
import type { HotelResultsSectionProps } from './props-types'
import { fetchHotels } from '@/infra/services'
import Link from 'next/link'

export function HotelResultsSection(props: Readonly<HotelResultsSectionProps>) {
  const { filters } = props
  const { cityId } = filters ?? {}

  const [sortBy, setSortBy] = useState('')
  const { setHotels } = useHotelsActions()
  const { hotels } = useHotelsState()

  const loadHotels = async() => {
    const { content: { data } } = await fetchHotels()
    setHotels(data as any)
  }

  useEffect(() => { loadHotels() }, [])

  const sortByPriceLowest = (hotels: any[]) => (
    hotels.slice().sort((a, b) => a.pricePerNight - b.pricePerNight)
  )

  const sortByPriceHighest = (hotels: any[]) => (
    hotels.slice().sort((a, b) => b.pricePerNight - a.pricePerNight)
  )

  const sortByRatingLowest = (hotels: any[]) => (
    hotels.slice().sort((a, b) => a.rating - b.rating)
  )

  const sortByRatingHighest = (hotels: any[]) => (
    hotels.slice().sort((a, b) => b.rating - a.rating)
  )

  const onSortBy = (value: string) => {
    setSortBy(value)
  }

  const hotelsSorted = useMemo(() => {
    const data = hotels?.filter((hotel) => (
      hotel?.cityId === Number(cityId)
    )).map((hotel) => {
      const rating = calculateAverageRating(hotel?.reviews, hotel?.rating) ?? 0
      const prices = hotel?.rooms?.map((room) => calculateTotalPrice(room.basePrice, room.taxes, room.discount)) ?? []
      const totalPrice = prices.reduce((a, b) => a + b, 0)
      const pricePerNight = (totalPrice / prices.length).toFixed(2)
      return { ...hotel, rating, pricePerNight }
    })

    switch (sortBy) {
      case 'priceLowest':
        return sortByPriceLowest(data)
      case 'priceHighest':
        return sortByPriceHighest(data)
      case 'ratingLowest':
        return sortByRatingLowest(data)
      case 'ratingHighest':
        return sortByRatingHighest(data)
      default:
        return data
    }
  }, [hotels, cityId, sortBy])

  return (
    <>
      <FilterSection onSort={ onSortBy } values={ filters } />

      <Grid container sx={ { backgroundColor: 'var(--content-bg-color)', py: 4 } }>
        <Container component="section">
          <Grid container>
            <Grid item sx={ { gap: 2, display: 'flex', flexDirection: 'column', px: 2, alignItems: 'center' } } xs={ 12 }>
              { hotelsSorted?.map((hotel) => (
                <Card key={ hotel.id } sx={ { height: 200, width: '80vw', maxWidth: 860 } }>
                  <CardActionArea LinkComponent={ Link } href={ `/hotel/${hotel.id}?${new URLSearchParams({ ...filters } as any).toString()}` } sx={ { display: 'flex', flexDirection: 'row', flex: 1, height: '100%' } }>
                    <CardMedia
                      alt={ hotel.name }
                      component="img"
                      image={ hotel.picture }
                      loading="lazy"
                      sx={ {
                        height: '100%',
                        width: '100%',
                        maxWidth: { xs: 140, md: 280 },
                        objectFit: 'cover',
                        objectPosition: 'center',
                      } }
                    />

                    <CardContent sx={ { display: 'flex', flexDirection: 'column', flex: 1, height: '100%' } }>
                      <Typography variant="h6">
                        { hotel.name }
                      </Typography>

                      <Typography variant="body2">
                        { `${hotel.city?.name }, ${hotel.state?.name}, ${hotel.country?.name}` }
                      </Typography>

                      <Box sx={ { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'flex-end' } }>
                        <Box>
                          <Typography variant="body2">
                            { `${hotel.rooms?.length } rooms` }
                          </Typography>

                          <Typography variant="body2">
                            { `${hotel.reviews?.length } reviews` }
                          </Typography>

                          <Rating rating={ hotel.rating as number } />
                        </Box>

                        <Box sx={ { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' } }>
                          <Typography fontWeight="bold" variant="body1">
                            { `$${hotel.pricePerNight }` }
                          </Typography>

                          <Typography variant="body2">per night</Typography>

                          <Typography variant="body2">includes taxes and fees</Typography>
                        </Box>
                      </Box>

                    </CardContent>
                  </CardActionArea>
                </Card>
              )) }
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </>
  )
}
