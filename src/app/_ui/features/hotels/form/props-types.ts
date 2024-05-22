export interface HotelFormProps {
  onCloseModal?: () => void
}

export interface HotelFormValues {
  name: string
  description: string
  address: string
  latitude: string
  longitude: string
  postalCode: string
  images: string[]
  amenities: string[]
  policies: string[]
  features: string[]
  payments: string[]
  available: boolean
}
