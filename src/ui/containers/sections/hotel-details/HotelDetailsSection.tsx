import React from 'react'
import { Container, Grid, Rating, Typography } from '@mui/material'
import { GoDot } from 'react-icons/go'

import { calculateAverageRating } from '@/domain/utils/rating'
import type { HotelDetailsSectionProps } from './props-types'
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

export function HotelDetailsSection(props: Readonly<HotelDetailsSectionProps>) {
  const { hotel } = props
  const rating = calculateAverageRating(hotel?.reviews ?? [], hotel?.rating)

  return (
    <Container className={ styles.section } component="section">
      <Grid container className={ styles.container }>
        <Grid item xs={ 12 }>
          <Typography component="h1" variant="h4">
            { hotel?.name }
          </Typography>
        </Grid>

        <Grid item xs={ 12 }>
          <Typography component="p" variant="body1">
            { `${hotel?.city?.name }, ${hotel?.state?.name}, ${hotel?.country?.name}` }
          </Typography>
        </Grid>

        <Grid item className={ styles.ratingContainer } xs={ 12 }>
          <Rating
            readOnly
            name="rating"
            precision={ 0.5 }
            size="small"
            value={ rating }
          />

          <Typography className={ styles.ratingText } variant="body1">
            { RATINGS[rating] }
          </Typography>
        </Grid>

        <Grid item mb={ 4 } xs={ 12 }>
          <Typography component="p" variant="body1">{ hotel?.description }</Typography>
        </Grid>

        <Grid item xs={ 12 }>
          <Typography gutterBottom fontSize={ 18 } variant="h6">Amenities</Typography>

          <Grid container className={ styles.amenitiesGrid }>
            { hotel?.amenities?.split('; ').map((amenity) => (
              <Grid
                item
                className={ styles.amenity }
                key={ amenity }
                xs={ 4 }
              >
                <GoDot />

                { amenity }
              </Grid>
                )) }
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
