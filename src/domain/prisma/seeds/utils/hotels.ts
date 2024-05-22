import { randomNumber } from '../../../utils/random'

type RegionType = {
  countryId: number
  cityId: number
  stateId: number
}

export const mapJsonToHotel = (json: any = {}, region: RegionType) => {
  const { summary, propertyGallery } = json
  const { countryId, cityId, stateId } = region

  const address = summary?.location?.address?.addressLine ?? ''
  const images = propertyGallery?.images?.map((i: any) => i?.image?.url) ?? []
  const amenities = summary?.amenities?.topAmenities?.items.map((i: any) => i.text) ?? []

  return {
    name: summary?.name ?? '',
    description: summary?.tagline ?? '',
    address,
    latitude: summary?.location?.coordinates?.latitude.toString() ?? '',
    longitude: summary?.location?.coordinates?.longitude.toString() ?? '',
    cityId,
    stateId,
    countryId,
    postalCode: address?.split(',').pop().trim() ?? '',
    picture: images?.[0] ?? '',
    images: images?.join('; ') ?? '',
    rating: summary?.overview?.propertyRating?.rating ?? 0,
    amenities: amenities?.join('; ') ?? '',
  }
}

export const mapJsonToRooms = (json: any = {}, hotelId: number) => {
  const { categorizedListings } = json ?? {}
  const rooms = []

  const randomLocation = () => {
    const floors = [1, 2, 3, 4, 5]
    return `Floor ${floors[randomNumber(0, 4)]} - Room ${randomNumber(1, 10)}`
  }

  for (const room of categorizedListings) {
    const { propertyUnit } = room.primarySelections?.[0] ?? {}
    const priceDetails = propertyUnit?.ratePlans?.[0]?.priceDetails?.[0] ?? {}
    const amenitiesContents = propertyUnit?.roomAmenities?.bodySubSections?.[0]?.contents ?? []

    const basePrice = priceDetails?.price?.lead?.amount ?? 0
    const discount = priceDetails?.dynamicRateRule?.discountPercent ?? 0
    const description = propertyUnit?.description ?? ''
    // const description = propertyUnit?.description?.replace(/<[^>]+>/g, '') // Remove HTML tags

    const images = propertyUnit?.unitGallery?.gallery?.map((i: any) => i?.image?.url) ?? []
    const amenities = amenitiesContents?.map((a: any) => a?.header?.text) ?? []
    const features = room?.features?.map((f: any) => f?.text) ?? []
    const payments = propertyUnit?.ratePlans?.[0]?.paymentPolicy?.map((p: any) => p?.paymentType) ?? []

    const bedsMatch = /(\d+)\s*(Single|Double|Twin|Queen|King)\s*(Beds|Bed)/i.exec(features)
    const capacityMatch = /Sleeps\s*(\d+)/i.exec(features)
    const beds = bedsMatch ? parseInt(bedsMatch[1], 10) : 1
    const capacity = capacityMatch ? parseInt(capacityMatch[1], 10) : 1
    const bathrooms = amenitiesContents?.some((c: any) => c.header?.text?.toLowerCase().includes('bathroom')) ? 1 : 0

    rooms.push({
      hotelId,
      type: room?.header?.text ?? '',
      description,
      basePrice,
      taxes: randomNumber(0, 10),
      discount: discount,
      location: randomLocation(),
      picture: images?.[0] ?? '',
      images: images?.join('; ') ?? '',
      beds,
      bathrooms,
      capacity,
      amenities: amenities?.join('; ').replace('; More', '') ?? '',
      features: features?.join('; ') ?? '',
      payments: payments?.join('; ') ?? '',
    })
  }

  return rooms
}

export const mapJsonToReviews = (json: any = {}, hotelId: number, users: number[]) => {
  const { reviews } = json?.reviewInfo ?? {}

  return reviews.map((r: any) => {
    const userId = users[randomNumber(0, users.length - 1)]

    return {
      hotelId,
      userId,
      rating: parseInt(r?.reviewScoreWithDescription?.value?.split('/')[0]) ?? 0,
      comment: r?.text ?? '',
      createdAt: new Date(r?.submissionTimeLocalized) ?? new Date(),
      updatedAt: new Date(r?.submissionTimeLocalized) ?? new Date(),
    }
  })
}
