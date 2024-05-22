import type { TypographyVariant } from '@mui/material'
import type { TypographyOptions } from '@mui/material/styles/createTypography'

import type { ThemeOptionsProps } from '../types'

type Variant = TypographyVariant
type Options = ThemeOptionsProps
type TypographyType = TypographyOptions

export const useTypographyVariants = () => (
  new Set<Variant>([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'button',
    'caption',
    'overline',
  ])
)

export const useThemeTypographyVariant = <T extends TypographyType>(variant: Variant, palette: Options): T | undefined => {
  const { typography, colorMode } = palette
  const isDark = (colorMode === 'dark')

  const variants = useTypographyVariants()
  const colorsMap = new Map<string, string>(Object.entries(typography as any))
  const typographyMap = new Map<string, string>()
  const typographyDark = new Map<string, string>()

  if (variants.has(variant)) {
    colorsMap.forEach((color, key) => {
      const scope = 'typography'
      const target = `${scope}-${variant}`
      const targetDark = `${scope}-dark-${variant}`
      const hasTarget = key.includes(target)
      const hasTargetDark = key.includes(targetDark)

      if (isDark && hasTargetDark) {
        const idx = key.replace(`${targetDark}-`, '')
        typographyDark.set(idx, color)
      } else if (hasTarget) {
        const idx = key.replace(`${target}-`, '')
        typographyMap.set(idx, color)
      }
    })

    if (isDark && typographyDark.size > 0) {
      typographyDark.forEach((color, key) => {
        typographyMap.set(key, color)
      })
    }
  }

  if (typographyMap.size === 0) {
    return undefined
  }

  return ({
    ...Object.fromEntries(typographyMap.entries())
  }) as T | any
}
