import type { ThemeOptionsProps, ThemeTypography } from '../types'
import { useThemeTypographyVariant, useTypographyVariants } from './helpers'

export const useThemeTypography = (palette: ThemeOptionsProps): ThemeTypography => {
  const { fontFamily, typography } = palette

  const styles = new Map()
  const variants = useTypographyVariants()

  variants.forEach((v) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    styles.set(v, useThemeTypographyVariant(v, palette))
  })

  // Fiter undefined
  styles.forEach((v, k) => {
    if (v === undefined) {
      styles.delete(k)
    }
  })

  console.info('Typography---------------------------------------', { styles, typography })

  return ({
    fontFamily,
    ...(Object.fromEntries(styles.entries())),

    // customInput: {
    //   marginTop: 1,
    //   marginBottom: 1,

    //   '& > label': {
    //     top: 23,
    //     left: 0,
    //     color: palette.grey500,

    //     '&[data-shrink="false"]': {
    //       top: 5
    //     }
    //   },

    //   '& > div > input': {
    //     padding: '30.5px 14px 11.5px !important'
    //   },

    //   '& legend': {
    //     display: 'none'
    //   },

    //   '& fieldset': {
    //     top: 0
    //   }
    // },

    // mainContent: {
    //   backgroundColor: palette.background,
    //   width: '100%',
    //   minHeight: 'calc(100vh - 88px)',
    //   flexGrow: 1,
    //   padding: '20px',
    //   marginTop: '88px',
    //   marginRight: '20px',
    //   borderRadius: `${palette.customization?.borderRadius}px`
    // },

    // menuCaption: {
    //   fontSize: '0.875rem',
    //   fontWeight: 500,
    //   color: palette.heading,
    //   padding: '6px',
    //   textTransform: 'capitalize',
    //   marginTop: '10px'
    // },

    // subMenuCaption: {
    //   fontSize: '0.6875rem',
    //   fontWeight: 500,
    //   color: palette.darkTextSecondary,
    //   textTransform: 'capitalize'
    // },

    // commonAvatar: {
    //   cursor: 'pointer',
    //   borderRadius: '8px'
    // },

    // smallAvatar: {
    //   width: '22px',
    //   height: '22px',
    //   fontSize: '1rem'
    // },

    // mediumAvatar: {
    //   width: '34px',
    //   height: '34px',
    //   fontSize: '1.2rem'
    // },

    // largeAvatar: {
    //   width: '44px',
    //   height: '44px',
    //   fontSize: '1.5rem'
    // },
  })
}
