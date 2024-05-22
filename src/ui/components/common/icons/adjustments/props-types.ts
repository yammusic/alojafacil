import type { IconButtonProps } from '@mui/material'

export interface AdjustmentsIconProps extends Omit<IconButtonProps, 'size' | 'color'> {
  color?: string
  onPress?: () => void
  size?: number
}
