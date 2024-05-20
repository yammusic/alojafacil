import React from 'react'
import { Grid } from '@mui/material'

import { Breadcrumb } from '../breadcrumb'
import type { ContentProps } from './props-types'
import styles from './styles.module.scss'

export function Content({ children, title }: Readonly<ContentProps>) {
  return (
    <>
      <Breadcrumb title={ title as string } />

      <Grid
        container
        bgcolor="background.paper"
        className={ styles.content }
      >
        <Grid item xs={ 12 }>
          { children }
        </Grid>
      </Grid>
    </>
  )
}
