import type { Room } from '@/domain/db/features/Room/model'

export interface BookingCardProps {
  room: Room
  booking: {
    checkIn: string
    checkOut: string
    adults: number
    childrens: number
    nights: number
  }
}
