import type { AutocompleteElementProps } from 'react-hook-form-mui'

export interface CountrySelectProps extends Omit<AutocompleteElementProps, 'options'> {
  options?: { label: string; id: number }[]
}
