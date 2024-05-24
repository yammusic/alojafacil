import type { SyntheticEvent } from 'react'
import type { CountryAttributes } from '@/domain/db/features/Country/types'

export interface CountryFormProps {
  onCancel?: (e: SyntheticEvent, reason: 'backdropClick' | 'escapeKeyDown') => void
  onSubmit?: (data: CountryFormValues) => void
  country?: CountryAttributes | null
}

export interface CountryFormValues {
  id: number
  name: string
  iso3: string
  iso2: string
  numeric_code: string
  phone_code: number
  capital: string
  currency: string
  currency_name: string
  currency_symbol: string
  tld: string
  native?: string
  region: string
  subregion: string
  latitude: string
  longitude: string
  emoji: string
}
