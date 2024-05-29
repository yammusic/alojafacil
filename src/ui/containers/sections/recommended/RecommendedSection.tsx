'use client'

import React, { useEffect, useMemo } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DateTime } from 'luxon'

import type { Hotel } from '@/domain/db/features/Hotel/model'
import { hotelsData, useHotelsActions } from '@/domain/providers/store'
import { calculateAverageRating } from '@/domain/utils/rating'
import { fetchHotels } from '@/infra/services/hotels/hotels'
import styles from './styles.module.scss'

const RATINGS: any = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
}

export function RecommendedSection() {
  const { setHotels } = useHotelsActions()
  const hotels = hotelsData()

  const loadHotels = async() => {
    const { content: { data } } = await fetchHotels()
    setHotels(data as any)
  }

  useEffect(() => { loadHotels() }, [])

  const sortByAverageRating = (hotels: Hotel[]): Hotel[] => (
    hotels.slice().sort((a, b) => {
      const averageRatingA = calculateAverageRating(a.reviews, a.rating)
      const averageRatingB = calculateAverageRating(b.reviews, b.rating)
      return averageRatingB - averageRatingA
    })
  )

  const sortedHotels = useMemo(() => sortByAverageRating(hotels), [hotels])

  return (
    <Grid container className={ styles.container } component="section">
      <Container>
        <Grid item className={ styles.titleContainer } xs={ 12 }>
          <Typography className={ styles.title } variant="h5">
            Recommended hotels
          </Typography>
        </Grid>

        <Grid item xs={ 12 }>
          <Stack useFlexGap className={ styles.cardsContainer }>
            { sortedHotels.slice(0, 8).map((hotel) => {
              const rating = calculateAverageRating(hotel?.reviews, hotel?.rating)

              const params = new URLSearchParams({
                cityId: hotel?.id.toString(),
                checkIn: DateTime.now().toISODate(),
                checkOut: DateTime.now().plus({ days: 1 }).toISODate(),
                adults: '1',
                childrens: '0',
              })

              return (
                <Card className={ styles.card } key={ hotel?.name }>
                  <CardActionArea
                    LinkComponent={ Link }
                    className={ styles.cardActionArea }
                    href={ `/hotel/${hotel?.id}?${params.toString()}` }
                  >
                    <CardMedia
                      alt={ hotel?.name }
                      className={ styles.cardMedia }
                      component="img"
                      image={ hotel?.picture }
                      loading="lazy"
                    />

                    <CardContent className={ styles.cardContent }>
                      <Typography noWrap variant="h6">
                        { hotel?.name }
                      </Typography>

                      <Typography gutterBottom variant="body2">
                        { `${hotel?.city?.name}, ${hotel?.country?.name}` }
                      </Typography>

                      <Box className={ styles.ratingContainer }>
                        <Rating
                          readOnly
                          // emptyIcon={ <FaRegStar fontSize="inherit" style={ { opacity: 0.55 } } /> }
                          name="rating"
                          precision={ 0.5 }
                          size="small"
                          value={ rating }
                        />

                        <Typography className={ styles.ratingText }>
                          { RATINGS[rating] }
                        </Typography>
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
