import type { ThemePaletteColor, ThemePaletteColorVariants } from '../types/palette'
import type { ThemeOptionsProps } from '../types/theme'

/* Alias types */
type Variant = ThemePaletteColorVariants
type Options = ThemeOptionsProps
type PaletteColor = ThemePaletteColor

export const useThemePaletteColorVariants = () => (
  new Set<Variant>([
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success',
    'grey',
    'common',
    'text',
    'background',
  ])
)

export const useThemePaletteColor = <T extends PaletteColor>(variant: Variant, palette: Options): T | undefined => {
  const { colors, colorMode } = palette
  const isDark = (colorMode === 'dark')

  const variants = useThemePaletteColorVariants()
  const colorsMap = new Map<string, string>(Object.entries({ ...colors }))
  const paletteMap = new Map<string, string>()
  const paletteDark = new Map<string, string>()

  if (variants.has(variant)) {
    colorsMap.forEach((color, key) => {
      const scope = 'palette'
      const target = `${scope}-${variant}`
      const targetDark = `${scope}-dark-${variant}`
      const hasTarget = key.includes(target)
      const hasTargetDark = key.includes(targetDark)

      if (isDark && hasTargetDark) {
        const idx = key.replace(`${targetDark}-`, '')
        paletteDark.set(idx, color)
      } else if (hasTarget) {
        const idx = key.replace(`${target}-`, '')
        paletteMap.set(idx, color)
      }
    })

    if (isDark && paletteDark.size > 0) {
      paletteDark.forEach((color, key) => {
        paletteMap.set(key, color)
      })
    }
  }

  if (paletteMap.size === 0) {
    return undefined
  }

  return ({
    ...Object.fromEntries(paletteMap.entries())
  }) as T
}
