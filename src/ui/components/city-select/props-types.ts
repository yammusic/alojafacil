import type { AutocompleteElementProps } from 'react-hook-form-mui'

export interface CitySelectProps extends Omit<AutocompleteElementProps, 'options'> {
  stateId: number
  options?: { label: string; id: number }[]
}
