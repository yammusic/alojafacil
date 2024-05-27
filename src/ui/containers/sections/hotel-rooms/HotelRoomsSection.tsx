import { calculateTotalPrice } from '@/domain/utils'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { GoDot } from 'react-icons/go'

import type { HotelRoomsSectionProps } from './props-types'
import styles from './styles.module.scss'

export function HotelRoomsSection(props: Readonly<HotelRoomsSectionProps>) {
  const { hotel } = props

  return (
    <Container>
      <Grid container mb={ 4 } px={ 2 }>
        <Grid item mb={ 2 } xs={ 12 }>
          <Typography variant="h4">
            Choose your room
          </Typography>
        </Grid>

        <Grid item md={ 4 } xs={ 12 }>
          {/* <FormContainer>
                <TextFieldElement label="Search" name="search" />
              </FormContainer> */}
        </Grid>

        <Grid item xs={ 12 }>
          <Grid container gap={ 4 } justifyContent="center">
            { hotel?.rooms?.map((room) => (
              <Card className={ styles.card } key={ room.id } sx={ { width: 345, display: 'flex', flexDirection: 'column' } }>
                <CardActionArea>
                  <CardMedia>
                    <Image
                      alt={ room?.type }
                      height={ 200 }
                      src={ room?.picture }
                      width={ 345 }
                    />
                  </CardMedia>

                  <CardContent>
                    <Typography gutterBottom noWrap variant="h5">
                      { room?.type }
                    </Typography>

                    <Stack direction="column" gap={ 1 } sx={ { mt: 4 } }>
                      { room?.features?.split('; ').map((feature) => (
                        <Stack
                          alignItems="center"
                          direction="row"
                          key={ feature }
                          sx={ { gap: 1 } }
                        >
                          <GoDot />

                          <Typography variant="body2">
                            { feature }
                          </Typography>
                        </Stack>
                          ))}
                    </Stack>
                  </CardContent>
                </CardActionArea>

                <CardActions sx={ { justifyContent: 'space-between', p: 2, alignItems: 'flex-end', flex: 1 } }>
                  <Box>
                    { !!room?.discount && (
                    <>
                      <Typography variant="subtitle1">
                        { `${room?.discount}% off` }
                      </Typography>

                      <Typography sx={ { textDecoration: 'line-through' } } variant="subtitle2">
                        { `$${room?.basePrice?.toFixed(2)}` }
                      </Typography>
                    </>
                        ) }

                    <Typography className={ styles.price } variant="h5">
                      { `$${calculateTotalPrice(room?.basePrice, room?.taxes, room?.discount).toFixed(2)}` }
                    </Typography>
                  </Box>

                  <Box>
                    <Button
                      className={ styles.button }
                      color="primary"
                      size="large"
                      variant="contained"
                    >
                      Reserve
                    </Button>
                  </Box>
                </CardActions>
              </Card>
                ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
