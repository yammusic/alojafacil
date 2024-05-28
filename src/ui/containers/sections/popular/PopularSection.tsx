'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Stack, Typography } from '@mui/material'

import styles from './styles.module.scss'
import { DateTime } from 'luxon'

const ITEMS = [
  {
    id: 20659,
    name: 'Cartagena',
    location: 'Colombia',
    image: '/images/cartagena.webp',
  },
  {
    id: 21331,
    name: 'San Andres',
    location: 'Colombia',
    image: '/images/san-andres.webp',
  },
  {
    id: 21074,
    name: 'Medellín',
    location: 'Colombia',
    image: '/images/medellin.webp',
  },
  {
    id: 112501,
    name: 'Bogotá',
    location: 'Colombia',
    image: '/images/bogota.webp',
  },
]

const cardWidth = 240
const cardHeight = 280

export function PopularSection() {
  return (
    <Grid
      container
      className={ styles.container }
      component="section"
    >
      <Container>
        <Grid
          item
          className={ styles.titleContainer }
          xs={ 12 }
        >
          <Typography
            gutterBottom
            className={ styles.title }
            fontSize={ 28 }
            variant="h5"
          >
            Popular destinations
          </Typography>
        </Grid>

        <Grid item xs={ 12 }>
          <Stack
            useFlexGap
            sx={ {
              gap: 4,
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              flexDirection: 'row',
            } }
          >
            { ITEMS.map((item) => {
              const params = new URLSearchParams({
                cityId: item.id.toString(),
                checkIn: DateTime.now().toISODate(),
                checkOut: DateTime.now().plus({ days: 1 }).toISODate(),
                adults: '1',
                childrens: '0',
              })
              const url = `/search?${params.toString()}`

              return (
                <Card
                  key={ item.name }
                  sx={ {
                    width: cardWidth,
                    height: cardHeight,
                    position: 'relative',
                    display: 'flex',
                  } }
                >
                  <CardActionArea
                    LinkComponent={ Link }
                    href={ url }
                    sx={ {
                      display: 'flex',
                      flex: 1,
                    } }
                  >
                    <CardMedia
                      alt={ item.name }
                      component="img"
                      image={ item.image }
                      sx={ {
                        width: cardWidth,
                        height: cardHeight,
                        objectFit: 'cover',
                        position: 'absolute',
                      } }
                    />

                    <CardContent
                      sx={ {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0, .25)',
                        zIndex: 1,
                      } }
                    >
                      <Typography
                        sx={ {
                          color: 'common.white',
                          fontWeight: 600,
                          textShadow: '1px 1px 2px #000',
                        } }
                        variant="h5"
                      >
                        { item.name }
                      </Typography>
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
