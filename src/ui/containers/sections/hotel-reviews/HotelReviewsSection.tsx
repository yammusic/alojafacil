import React from 'react'
import { Avatar, Container, Grid, Rating, Stack, Typography } from '@mui/material'

import type { HotelReviewsSectionProps } from './props-types'
import styles from './styles.module.scss'

export function HotelReviewsSection(props: Readonly<HotelReviewsSectionProps>) {
  const { hotel, users } = props

  return (
    <Container>
      <Grid container mb={ 4 } px={ 2 }>
        <Grid item mb={ 2 } xs={ 12 }>
          <Typography
            gutterBottom
            className={ styles.title }
            fontSize={ 26 }
            variant="h4"
          >
            Reviews
          </Typography>
        </Grid>

        <Grid item xs={ 12 }>
          <Grid container spacing={ 4 }>
            { hotel?.reviews?.map((review) => {
              const user = users?.find((user) => user?.id === review?.userId)

              return (
                <Grid item key={ review?.id } xs={ 6 }>
                  <Stack alignItems="center" direction="row" spacing={ 1 }>
                    <Avatar alt={ user?.username } src={ user?.info?.avatar } />

                    <Typography
                      gutterBottom
                      className={ styles.title }
                      key={ review?.id }
                      variant="body1"
                    >
                      { user?.username }
                    </Typography>
                  </Stack>

                  <Rating
                    readOnly
                    name="rating"
                    precision={ 0.5 }
                    size="small"
                    sx={ { mt: 1, mb: 2 } }
                    value={ review?.rating }
                  />

                  <Typography
                    gutterBottom
                    className={ styles.title }
                    variant="body1"
                  >
                    { review?.comment }
                  </Typography>
                </Grid>
              )
             }) }
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
