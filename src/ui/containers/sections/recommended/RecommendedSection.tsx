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
  Rating,
  Stack,
  Typography,
} from '@mui/material'

import type { Hotel } from '@/domain/db/features/Hotel/model'
import { hotelsData, useHotelsActions } from '@/domain/providers/store'
import { calculateAverageRating } from '@/domain/utils/rating'
import { fetchHotels } from '@/infra/services'
import styles from './styles.module.scss'
import Link from 'next/link'

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

              return (
                <Card className={ styles.card } key={ hotel?.name }>
                  <CardActionArea
                    LinkComponent={ Link }
                    className={ styles.cardActionArea }
                    href={ `/hotel/${hotel?.id}` }
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
