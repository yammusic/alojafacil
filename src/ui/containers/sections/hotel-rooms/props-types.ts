import type { Hotel } from '@/domain/db/features/Hotel/model'
import type { FilterFormValues } from '../filter'

export interface HotelRoomsSectionProps {
  filters?: Partial<FilterFormValues>
  hotel: Hotel
}
