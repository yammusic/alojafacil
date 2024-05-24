import React from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import type { StateViewProps } from './props-types'

export function StateView({ state }: Readonly<StateViewProps>) {
  return (
    <Grid container>
      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">ID</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ state.id }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ 6 }>
          <Typography fontWeight="bold" variant="subtitle1">Name</Typography>
        </Grid>

        <Grid item xs={ 6 }>
          <Typography variant="body1">{ state.name }</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
