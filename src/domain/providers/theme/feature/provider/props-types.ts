import type { PaletteMode, Theme } from '@mui/material'

export type ThemeColorMode = PaletteMode

export interface ThemeProviderProps {
  theme?: Theme
  children: React.ReactNode
}
