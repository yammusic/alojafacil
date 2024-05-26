import type { HotelAttributes } from '@/domain/db/features/Hotel/types'
import type { SyntheticEvent } from 'react'

export interface HotelFormProps {
  onCancel?: (e: SyntheticEvent, reason: 'backdropClick' | 'escapeKeyDown') => void
  onSubmit?: (data: HotelAttributes) => void
  hotel?: HotelAttributes | null
}

export interface HotelFormValues {
  id?: number
  name: string
  description: string
  address: string
  latitude: string
  longitude: string
  cityId: number
  stateId: number
  countryId: number
  postalCode: string
  picture: string
  images: string[]
  amenities: string[]
  policies: string[]
  features: string[]
  payments: string[]
  available: boolean
}
