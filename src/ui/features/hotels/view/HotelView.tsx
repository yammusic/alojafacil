import React from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import type { HotelViewProps } from './props-types'

export function HotelView({ hotel }: Readonly<HotelViewProps>) {
  const leftColumnWidth = 4
  const rightColumnWidth = 8

  return (
    <Grid container>
      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">ID</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ hotel.id }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Name</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ hotel.name }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Description</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ hotel.description }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Address</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ hotel.address }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Latitude</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ hotel.latitude }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Longitude</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ hotel.longitude }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">City</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ hotel.city?.name }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">State</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ hotel.state?.name }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Country</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ hotel.country?.name }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Postal Code</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ hotel.postalCode }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Available</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ hotel.available ? 'Yes' : 'No' }</Typography>
        </Grid>
      </Grid>


      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Rating</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ hotel.rating }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Amenities</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ hotel.amenities }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Policies</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ hotel.policies }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Features</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ hotel.features }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Payments</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ hotel.payments }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Status</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ hotel.status }</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
