import type {
  Theme as ThemeBase,
  ThemeOptions as ThemeOptionsBase,
  PaletteMode,
} from '@mui/material'

import type { ThemeOptionsColors } from './colors'
import type { ThemeTypography } from './typography'

/* Theme color mode type */
export type ThemeColorMode = PaletteMode

/* Theme options type */
export interface ThemeOptions extends ThemeOptionsBase {}

/* Theme type */
export interface Theme extends ThemeBase {}

/* Theme options props type */
export interface ThemeOptionsProps {
  borderRadius?: number
  colorMode?: ThemeColorMode
  colors?: ThemeOptionsColors
  fontFamily?: string
  typography?: ThemeTypography
}
