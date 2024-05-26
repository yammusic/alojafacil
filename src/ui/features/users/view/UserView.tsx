import React from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import type { UserViewProps } from './props-types'

export function UserView({ user }: Readonly<UserViewProps>) {
  const leftColumnWidth = 4
  const rightColumnWidth = 8

  return (
    <Grid container>
      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">ID</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ user.id }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Username</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ user.username }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Email</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ user.email }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Name</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ `${user.info?.firstName} ${user.info?.lastName}` }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Document ID</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">
            { `${user.info?.documentType === 'ID' ? 'CC' : user.info?.documentType} ${user.info?.documentNumber}` }
          </Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Gender</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ user.info?.gender }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Date of birth</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ `${user.info?.dateOfBirth}` }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Phone number</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ user.info?.phoneNumber }</Typography>
        </Grid>
      </Grid>

      <Grid component={ Stack } direction="row" xs={ 12 }>
        <Grid item xs={ leftColumnWidth }>
          <Typography fontWeight="bold" variant="subtitle1">Address</Typography>
        </Grid>

        <Grid item xs={ rightColumnWidth }>
          <Typography variant="body1">{ user.info?.address }</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
