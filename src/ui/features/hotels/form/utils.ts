import type { Hotel } from '@/domain/db/features/Hotel/model'
import type { HotelAttributes } from '@/domain/db/features/Hotel/types'
import type { HotelFormValues } from './props-types'

export const mapHotelToValues = (hotel: Hotel): HotelFormValues => {
  return {
    id: hotel?.id,
    name: hotel?.name,
    description: hotel?.description ?? '',
    address: hotel?.address,
    latitude: hotel?.latitude,
    longitude: hotel?.longitude,
    cityId: hotel?.cityId,
    stateId: hotel?.stateId,
    countryId: hotel?.countryId,
    postalCode: hotel?.postalCode,
    picture: hotel?.picture,
    images: hotel?.images.split('; ') ?? [],
    amenities: hotel?.amenities?.split('; ') ?? [],
    policies: hotel?.policies?.split('; ') ?? [],
    features: hotel?.features?.split('; ') ?? [],
    payments: hotel?.payments?.split('; ') ?? [],
    available: hotel?.available,
  }
}

export const mapValuesToHotel = (values: HotelFormValues): HotelAttributes => {
  return {
    ...values,
    images: values.images.join('; '),
    amenities: values.amenities.join('; '),
    policies: values.policies.join('; '),
    features: values.features.join('; '),
    payments: values.payments.join('; '),
  }
}
