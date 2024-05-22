import React from 'react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { IoHome } from 'react-icons/io5'
import { MdKeyboardArrowRight } from 'react-icons/md'

import type { BreadcrumbProps } from './props-types'
import styles from './styles.module.scss'
import Link from 'next/link'

export function Breadcrumb({ path, title }: Readonly<BreadcrumbProps>) {
  return (
    <Box bgcolor="background.paper" className={ styles.breadcrumb }>
      <Typography className={ styles.title } variant="h5">
        { title }
      </Typography>

      <Stack className={ styles.path }>
        <IconButton
          LinkComponent={ Link }
          className={ styles.icon }
          href="/"
        >
          <IoHome size={ 18 } />
        </IconButton>

        <MdKeyboardArrowRight size={ 18 } />

        <Typography variant="body2">
          { path ?? title }
        </Typography>
      </Stack>
    </Box>
  )
}
