import type { AutocompleteElementProps } from 'react-hook-form-mui'

export interface HotelSelectProps extends Omit<AutocompleteElementProps, 'options'> {
  options?: { label: string; id: number }[]
}
