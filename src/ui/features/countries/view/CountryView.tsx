import React from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import type { CountryViewProps } from './props-types'

export function CountryView({ country }: Readonly<CountryViewProps>) {
  return (
    <Grid container>
      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">ID</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ country.id }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">Name</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ country.name }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">ISO 3</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ country.iso3 }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">ISO 2</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ country.iso2 }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">Numeric code</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ country.numeric_code }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">Phone code</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ country.phone_code }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">Capital</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ country.capital }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">Currency</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ country.currency }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">Currency name</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ country.currency_name }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">Currency symbol</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ country.currency_symbol }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">TLD</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ country.tld }</Typography>
        </Grid>
      </Grid>

      { !!country.native && (
        <Grid component={ Stack } direction="row" xs={ 12 }>
          <Grid item xs={ 6 }>
            <Typography fontWeight="bold" variant="subtitle1">Native</Typography>
          </Grid>

          <Grid item xs={ 6 }>
            <Typography variant="body1">{ country.native }</Typography>
          </Grid>
        </Grid>
      )}

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">Region</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ country.region }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">Subregion</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ country.subregion }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">Latitude</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ country.latitude }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">Longitude</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ country.longitude }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">Emoji</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ country.emoji }</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
