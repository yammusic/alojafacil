import type { ReactNode } from 'react'
import type { GridProps } from '@mui/material'

export interface ContentProps extends GridProps {
  children: ReactNode
  title: string
}
