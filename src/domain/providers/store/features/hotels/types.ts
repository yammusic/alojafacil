import type { Hotel } from '@/domain/db/features/Hotel/model'
import type { Room } from '@/domain/db/features/Room/model'

export interface HotelsState {
  hotels: Hotel[]
  rooms: Room[]
}
