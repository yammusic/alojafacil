export interface BookingTemplateProps {
  booking: {
    name: string
    type: string
    location: string
    checkIn: string
    checkOut: string
    picture: string
    price: number
    taxes: number
    discount?: number
  }
}
