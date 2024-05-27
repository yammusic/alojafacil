import React from 'react'
import Image from 'next/image'
import { Container, Grid } from '@mui/material'

import type { GallerySectionProps } from './props-types'
import styles from './styles.module.scss'

export function GallerySection(props: Readonly<GallerySectionProps>) {
  const { images } = props

  return (
    <Container component="section">
      <Grid container className={ styles.container }>
        <Grid item className={ styles.left } xs={ 6 }>
          <Image
            alt="image"
            className={ styles.image }
            height={ 500 }
            loading="lazy"
            src={ images[0] }
            width={ 500 }
          />
        </Grid>

        <Grid item className={ styles.right } xs={ 6 }>
          <Grid container className={ styles.grid }>
            { images.slice(1, 5).map((image, idx) => (
              <Grid
                item
                className={ styles.gridItem }
                key={ image }
                sx={ {
                  padding: idx <= 1 ? '0 0 0.13rem 0.25rem' : '0.13rem 0 0 0.25rem',
                } }
                xs={ 6 }
              >
                <Image
                  alt="image"
                  className={ styles.image }
                  height={ 160 }
                  loading="lazy"
                  src={ image }
                  width={ 200 }
                />
              </Grid>
            )) }
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
