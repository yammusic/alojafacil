'use client'

import React from 'react'
import NextTopLoader from 'nextjs-toploader'
import { useTheme } from '@mui/material'

export function TopLoader() {
  const theme = useTheme()

  return (
    <NextTopLoader
      color={ theme.palette.primary.main }
      height={ 4 }
      zIndex={ 2000 }
    />
  )
}
