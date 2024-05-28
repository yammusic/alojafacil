import React from 'react'
import { Box, Rating as MuiRating, Typography } from '@mui/material'
import styles from './styles.module.scss'

export function Rating({ rating }: Readonly<{ rating: number }>) {
  const RATINGS: any = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  }

  return (
    <Box className={ styles.container }>
      <MuiRating
        readOnly
        name="rating"
        precision={ 0.5 }
        size="small"
        value={ rating }
      />

      <Typography className={ styles.ratingText }>
        { RATINGS[rating] }
      </Typography>
    </Box>
  )
}
