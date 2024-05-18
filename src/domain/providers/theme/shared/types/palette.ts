import type {
  CommonColors,
  PaletteColorOptions,
  PaletteOptions,
  TypeBackground,
  TypeText,
} from '@mui/material'

export type ThemePaletteColorVariants = (
  'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'grey'
  | 'common'
  | 'text'
  | 'background'
)

export type ThemePaletteColor = (
  Partial<PaletteColorOptions>
  | Partial<CommonColors>
  | Partial<TypeText>
  | Partial<TypeBackground>
  | null
  | undefined
)

/* Theme palette type */
export interface ThemePalette extends PaletteOptions {
  // orange?: {
  //   dark?: string
  //   light?: string
  //   main?: string
  // }

  // dark?: {
  //   dark?: string
  //   light?: string
  //   main?: string
  //   800?: string
  //   900?: string
  // }

  // text?: {
  //   dark?: string
  //   hint?: string
  //   primary?: string
  //   secondary?: string
  // }
}
