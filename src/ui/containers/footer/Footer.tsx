'use client'

import React from 'react'
import { Container, Typography, useTheme } from '@mui/material'

import { Link } from '../../components'
import styles from './styles.module.scss'

export function Footer() {
  const { palette } = useTheme()

  return (
    <footer
      className={ styles.footer }
      style={ {
        backgroundColor: palette.secondary.dark,
      } }
    >
      <Container className={ styles.container }>
        <Typography color="common.white" fontSize={ 14 } variant="caption">
          { 'Made with ❤️ by ' }

          <Link
            color="common.white"
            fontWeight="bold"
            href="https://github.com/hackettyam"
            rel="noreferrer"
            target="_blank"
          >
            @HackettYam
          </Link>
        </Typography>
      </Container>
    </footer>
  )
}
