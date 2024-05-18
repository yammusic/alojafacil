/* eslint-disable react-hooks/rules-of-hooks */
import type { ThemeOptions } from '@mui/material/styles'
import {
  createTheme as createThemeProvider,
  useTheme as useThemeProvider,
} from '@mui/material/styles'

import { useThemePalette } from './palette'
import { useThemeTypography } from './typography'
import { themeComponents } from './components'
import type { ThemeOptionsProps, ThemeTypography } from '../types'

export const createTheme = (options: ThemeOptionsProps) => {
  // const options = {
  //   colors,
  //   heading: isDark ? colors.darkTextTitle : colors.grey900,
  //   paper: isDark ? colors.darkPaper : colors.paper,
  //   backgroundDefault: isDark ? colors.darkBackground : colors.primaryLight,
  //   background: isDark ? colors.darkBackground : colors.primaryLight,
  //   darkTextPrimary: isDark ? colors.darkTextPrimary : colors.grey700,
  //   darkTextSecondary: isDark ? colors.darkTextSecondary : colors.grey500,
  //   textDark: colors.grey900,
  //   menuSelected: isDark ? colors.darkSecondaryDark : colors.secondaryDark,
  //   menuSelectedBack: isDark ? colors.darkSecondaryLight : colors.secondaryLight,
  //   divider: isDark ? colors.grey800 : colors.grey200,
  //   ...customization,
  // }

  const themeOptions: ThemeOptions = {
    components: themeComponents(options),
    direction: 'ltr',
    mixins: {
      toolbar: {
        minHeight: 48,
        padding: '16px',

        '@media (min-width: 600px)': {
          // padding: '8px',
          minHeight: 48,
        },
      },
    },
    palette: useThemePalette(options),
    typography: useThemeTypography(options),
  }

  console.log('themeOptions--------------------------', createThemeProvider().typography, themeOptions.typography)
  return createThemeProvider({}, themeOptions)
}

export type Theme = ReturnType<typeof createTheme> & {
  typography: ThemeTypography,
}

export const useTheme = () => useThemeProvider<Theme>()

export * from './components'
export * from './palette'
export * from './typography'
