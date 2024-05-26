import React from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import type { RoomViewProps } from './props-types'

export function RoomView({ room }: Readonly<RoomViewProps>) {
  const leftColumnWidth = 4
  const rightColumnWidth = 8

  return (
    <Grid container>
      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">ID</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ room.id }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Hotel</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ room.hotel?.name }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Type</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ room.type }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Description</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography
            component={ 'div' }
            dangerouslySetInnerHTML={ { __html: String(room.description) } }
            variant="body1"
          />
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Location</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ room.location }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Base Price</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ room.basePrice }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Taxes</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ room.taxes }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Discount</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ room.discount }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Available</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ room.available ? 'Yes' : 'No' }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Beds</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ room.beds }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Bed Capacity</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ room.capacity }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Bathrooms</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ room.bathrooms }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Amenities</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ room.amenities }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Features</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ room.features }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Payments</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ room.payments }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Status</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ room.status }</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
