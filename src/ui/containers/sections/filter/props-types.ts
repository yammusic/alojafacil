import type { DateTime } from 'luxon'

export interface FilterSectionProps {
  onSearch?: (value: string) => void
  onSort?: (value: string) => void
  values?: Partial<FilterFormValues>
}

export interface FilterFormValues {
  cityId: number
  checkIn: DateTime
  checkOut: DateTime
  adults: number
  childrens: number
  sort?: string
}
