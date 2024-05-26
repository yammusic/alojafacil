import type { AutocompleteElementProps } from 'react-hook-form-mui'

export interface RoleSelectProps extends Omit<AutocompleteElementProps, 'multiple' | 'options'> {
  multiple?: boolean
  options?: { label: string; id: number }[]
}
