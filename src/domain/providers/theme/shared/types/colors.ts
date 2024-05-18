export interface ThemeOptionsColorsPrimary {
  primary200?: string
  primary800?: string
  primaryDark?: string
  primaryLight?: string
  primaryMain?: string
  darkPrimary200?: string
  darkPrimary800?: string
  darkPrimaryDark?: string
  darkPrimaryLight?: string
  darkPrimaryMain?: string
}

export interface ThemeOptionsColorsSecondary {
  secondary200?: string
  secondary800?: string
  secondaryDark?: string
  secondaryLight?: string
  secondaryMain?: string
  darkSecondary200?: string
  darkSecondary800?: string
  darkSecondaryDark?: string
  darkSecondaryLight?: string
  darkSecondaryMain?: string
}

export interface ThemeOptionsColorsError {
  error200?: string
  error600?: string
  errorDark?: string
  errorLight?: string
  errorMain?: string
  darkError200?: string
  darkError600?: string
  darkErrorDark?: string
  darkErrorLight?: string
  darkErrorMain?: string
}

export interface ThemeOptionsColorsWarning {
  warning200?: string
  warning600?: string
  warningDark?: string
  warningLight?: string
  warningMain?: string
  darkWarning200?: string
  darkWarning600?: string
  darkWarningDark?: string
  darkWarningLight?: string
  darkWarningMain?: string
}

export interface ThemeOptionsColorsInfo {
  info200?: string
  info600?: string
  infoDark?: string
  infoLight?: string
  infoMain?: string
  darkInfo200?: string
  darkInfo600?: string
  darkInfoDark?: string
  darkInfoLight?: string
  darkInfoMain?: string
}

export interface ThemeOptionsColorsSuccess {
  success200?: string
  success600?: string
  successDark?: string
  successLight?: string
  successMain?: string
  darkSuccess200?: string
  darkSuccess600?: string
  darkSuccessDark?: string
  darkSuccessLight?: string
  darkSuccessMain?: string
}

export interface ThemeOptionsColorsCommon {
  commonBlack?: string
  commonWhite?: string
}

export interface ThemeOptionsColorsGrey {
  grey50?: string
  grey100?: string
  grey200?: string
  grey300?: string
  grey400?: string
  grey500?: string
  grey600?: string
  grey700?: string
  grey800?: string
  grey900?: string
  greyA100?: string
  greyA200?: string
  greyA400?: string
  greyA700?: string
  darkGrey50?: string
  darkGrey100?: string
  darkGrey200?: string
  darkGrey300?: string
  darkGrey400?: string
  darkGrey500?: string
  darkGrey600?: string
  darkGrey700?: string
  darkGrey800?: string
  darkGrey900?: string
  darkGreyA100?: string
  darkGreyA200?: string
  darkGreyA400?: string
  darkGreyA700?: string
}

export interface ThemeOptionsColorsText {
  textPrimary?: string
  textSecondary?: string
  textDisabled?: string
  darkTextPrimary?: string
  darkTextSecondary?: string
  darkTextDisabled?: string
}

export interface ThemeOptionsColorsBackground {
  default?: string
  paper?: string
  darkDefault?: string
  darkPaper?: string
}

export type ThemeOptionsColorBase = (
  ThemeOptionsColorsPrimary
  & ThemeOptionsColorsSecondary
  & ThemeOptionsColorsError
  & ThemeOptionsColorsWarning
  & ThemeOptionsColorsInfo
  & ThemeOptionsColorsSuccess
  & ThemeOptionsColorsCommon
  & ThemeOptionsColorsGrey
  & ThemeOptionsColorsText
  & ThemeOptionsColorsBackground
)

export interface ThemeOptionsColors extends ThemeOptionsColorBase {
}
