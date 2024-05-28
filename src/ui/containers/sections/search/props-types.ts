import type { DateTime } from 'luxon'

export interface SearchSectionProps {
  onSearch?: (value: string) => void
}

export interface SearchFormValues {
  cityId: number
  checkIn: DateTime
  checkOut: DateTime
  adults: number
  childrens: number
}

export interface MenuGuestsProps {
  anchorEl: Element | null
  onClose: () => void
  onIncrementAdults: () => void
  onDecrementAdults: () => void
  onIncrementChildren: () => void
  onDecrementChildren: () => void
  adults: number
  childrens: number
}
