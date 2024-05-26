import type { AutocompleteElementProps } from 'react-hook-form-mui'

export interface StateSelectProps extends Omit<AutocompleteElementProps, 'options'> {
  countryId: number
  options?: { label: string; id: number }[]
}
