import type { Hotel } from '@/domain/db/features/Hotel/model'
import type { User } from '@/domain/db/features/User/model'

export interface HotelReviewsSectionProps {
  hotel: Hotel
  users: User[]
}
