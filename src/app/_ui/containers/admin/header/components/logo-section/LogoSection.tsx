import React from 'react'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'

import { Logo } from '@/app/components'
import styles from './styles.module.scss'

export function LogoSection() {
  const appName = 'Aloja Facil'

  return (
    <Box
      className={ styles.logoContainer }
      component="span"
      sx={ { display: { xs: 'none', md: 'flex' } } }
    >
      <Link passHref className={ styles.logoLink } href="/admin">
        <Logo size={ 40 } />

        <Typography className={ styles.logoTitle } variant="h5">
          { appName }
        </Typography>
      </Link>
    </Box>
  )
}
