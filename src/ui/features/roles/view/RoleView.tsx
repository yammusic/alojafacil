import React from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import type { RoleViewProps } from './props-types'

export function RoleView({ role }: Readonly<RoleViewProps>) {
  const leftColumnWidth = 4
  const rightColumnWidth = 8

  return (
    <Grid container>
      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">ID</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ role.id }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Name</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ role.name.humanize() }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Status</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ role.status }</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
