import type { RoomAttributes } from '@/domain/db/features/Room/types'
import type { SyntheticEvent } from 'react'

export interface RoomFormProps {
  onCancel?: (e: SyntheticEvent, reason: 'backdropClick' | 'escapeKeyDown') => void
  onSubmit?: (data: RoomAttributes) => void
  room?: RoomAttributes | null
}

export interface RoomFormValues {
  id?: number
  hotelId: number
  type: string
  description: string
  basePrice: number
  taxes: number
  discount?: number
  location: string
  picture: string
  images: string[]
  beds: number
  bathrooms: number
  capacity: number
  amenities: string[]
  features: string[]
  payments: string[]
  available: boolean
}
