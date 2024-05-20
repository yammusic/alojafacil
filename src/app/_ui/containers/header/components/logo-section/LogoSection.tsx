import React from 'react'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'

import { APP_NAME } from '@/domain/constants'
import { Logo } from '@/app/components'
import styles from './styles.module.scss'

export function LogoSection() {
  const appName = APP_NAME

  return (
    <Box className={ styles.logoContainer } component="span">
      <Link passHref className={ styles.logoLink } href="/">
        <Logo size={ 40 } />

        <Typography className={ styles.logoTitle } variant="h5">
          { appName }
        </Typography>
      </Link>
    </Box>
  )
}
