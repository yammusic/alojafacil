'use client'

import React from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Rating, Stack, Typography } from '@mui/material'

import styles from './styles.module.scss'

const HOTELS = [
  {
    name: 'NH Collection Bogotá WTC Royal',
    location: 'Bogotá, Colombia',
    image: 'https://images.trvl-media.com/lodging/1000000/10000/2400/2321/706f3d74.jpg?impolicy=fcrop&w=469&h=201&p=1&q=medium',
  },
  {
    name: 'Hotel Casa Canabal',
    location: 'Cartagena, Colombia',
    image: 'https://images.trvl-media.com/lodging/5000000/4200000/4192700/4192674/30f56c65.jpg?impolicy=resizecrop&rw=455&ra=fit',
  },
  {
    name: 'Medellín',
    location: 'Colombia',
    image: '/images/medellin.webp',
  },
  {
    name: 'Bogotá',
    location: 'Colombia',
    image: '/images/bogota.webp',
  },
  {
    name: 'NH Collection Bogotá WTC Royal 2',
    location: 'Bogotá, Colombia',
    image: 'https://images.trvl-media.com/lodging/1000000/10000/2400/2321/706f3d74.jpg?impolicy=fcrop&w=469&h=201&p=1&q=medium',
  },
  {
    name: 'Hotel Casa Canabal 2',
    location: 'Cartagena, Colombia',
    image: 'https://images.trvl-media.com/lodging/5000000/4200000/4192700/4192674/30f56c65.jpg?impolicy=resizecrop&rw=455&ra=fit',
  },
  {
    name: 'Medellín 2',
    location: 'Colombia',
    image: '/images/medellin.webp',
  },
  {
    name: 'Bogotá 2',
    location: 'Colombia',
    image: '/images/bogota.webp',
  },
]

const ratings: any = {
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

const randomNumber = (min: number, max: number, step: number = 1) => {
  const range = (max - min) / step
  const randomStep = Math.floor(Math.random() * (range + 1))
  return min + randomStep * step
}

export function RecommendedSection() {
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
            { HOTELS.map((item) => {
              const rating = randomNumber(3, 5, 0.5)

              return (
                <Card className={ styles.card } key={ item.name }>
                  <CardActionArea className={ styles.cardActionArea }>
                    <CardMedia
                      alt={ item.name }
                      className={ styles.cardMedia }
                      component="img"
                      image={ item.image }
                      loading="lazy"
                    />

                    <CardContent className={ styles.cardContent }>
                      <Typography noWrap variant="h6">
                        { item.name }
                      </Typography>

                      <Typography gutterBottom variant="body2">
                        { item.location }
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
                          { ratings[rating] }
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
