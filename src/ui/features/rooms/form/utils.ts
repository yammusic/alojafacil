import type { Room } from '@/domain/db/features/Room/model'
import type { RoomAttributes } from '@/domain/db/features/Room/types'
import type { RoomFormValues } from './props-types'

export const mapRoomToValues = (room: Room): RoomFormValues => {
  return {
    id: room?.id,
    hotelId: room?.hotelId,
    type: room?.type,
    description: room?.description ?? '',
    basePrice: room?.basePrice,
    taxes: room?.taxes,
    discount: room?.discount,
    location: room?.location,
    picture: room?.picture,
    images: room?.images.split('; ') ?? [],
    beds: room?.beds,
    bathrooms: room?.bathrooms,
    capacity: room?.capacity,
    amenities: room?.amenities?.split('; ') ?? [],
    features: room?.features?.split('; ') ?? [],
    payments: room?.payments?.split('; ') ?? [],
    available: room?.available,
  }
}

export const mapValuesToRoom = (values: RoomFormValues): RoomAttributes => {
  return {
    ...values,
    images: values.images.join('; '),
    amenities: values.amenities.join('; '),
    features: values.features.join('; '),
    payments: values.payments.join('; '),
  }
}
