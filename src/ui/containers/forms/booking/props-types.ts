import type { DateTime } from 'luxon'

export interface BookingFormProps {
  booking: {
    roomId: number
    checkIn: Date
    checkOut: Date
    adults: number
    childrens: number
  }
}

export interface BookingFormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  gender: string
  dateOfBirth: DateTime
  documentType: string
  documentNumber: string
  address?: string

  contactName: string
  contactPhone: string
}
