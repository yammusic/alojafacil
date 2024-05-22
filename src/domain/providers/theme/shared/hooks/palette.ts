import type {
  PaletteColorOptions,
} from '@mui/material'

import { useThemePaletteColor, useThemePaletteColorVariants } from './colors'
import type { ThemeOptionsProps } from '../types/theme'
import type { ThemePalette } from '../types/palette'

export const useThemePalette = (palette: ThemeOptionsProps): ThemePalette => {
  const { colorMode: mode } = palette

  const colors = new Map()
  const variants = useThemePaletteColorVariants()

  variants.forEach((v) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    colors.set(v, useThemePaletteColor<PaletteColorOptions>(v, palette))
  })

  // Fiter undefined
  colors.forEach((v, k) => {
    if (v === undefined) {
      colors.delete(k)
    }
  })

  return ({
    mode,
    ...(Object.fromEntries(colors.entries())),
  })
}
