import axios from 'axios'
import '../../polyfills'

import { useTurso } from '../../db/client'
import { mapJsonToHotel, mapJsonToReviews, mapJsonToRooms } from './utils/hotels'



export async function seedHotels() {
  const db = useTurso()

  const regions: any = {
    cartagena: '6140796',
    sanAndres: '6024028',
    medellin: '6140804',
    bogota: '653',
    cali: '863',
    santaMarta: '3221',
    barranquilla: '494',
    ibague: '602442',
  }

  const domain = 'US'
  const locale = 'en_US'
  const checkinDate = '2024-05-24'
  const checkoutDate = '2024-05-27'

  const options = {
    search: {
      url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/search',
      params: {
        domain,
        locale,
        region_id: regions.ibague,
        checkin_date: checkinDate,
        checkout_date: checkoutDate,
        // sort_order: 'DISTANCE',
        sort_order: 'RECOMMENDED',
        adults_number: '1',
        // children_ages: '0,5',
        lodging_type: 'HOTEL,HOSTEL,APART_HOTEL',
        // accessibility: '',
        // price_min: 0,
        // star_rating_ids: '3,4,5',
        // meal_plan: 'ALL_INCLUSIVE',
        // page_number: 1,
        // price_max: '100000',
        // amenities: 'WIFI',
        // payment_type: 'PAY_LATER',
        // guest_rating_min: '8'
        // available_filter: 'SHOW_AVAILABLE_ONLY',
      },
    },
    summary: {
      url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/summary',
      params: {
        domain,
        locale,
      },
    },
    reviews: {
      url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/reviews/list',
      params: {
        domain,
        locale,
        sort_order: 'NEWEST_TO_OLDEST',
        // page_number: '1',
      },
    },
    rooms: {
      url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/offers',
      params: {
        adults_number: 1,
        checkin_date: checkinDate,
        checkout_date: checkoutDate,
        domain,
        locale,
        // children_age: '0,5',
      },
    },
  }

  try {
    const regionsKeys = Object.keys(regions)
    const baseRequest = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
      },
    }

    for (const key of regionsKeys) {
      const searchRequest = {
        ...baseRequest,
        ...options.search,
        params: {
          ...options.search.params,
          region_id: regions[key],
        }
      }

      const { data: searchData } = await axios.request(searchRequest)
      const regionHotels = searchData.properties.filter((h: any) => h.regionId === regions[key])
      const hotelsIds = regionHotels.map((h: any) => h.id)

      let cityWhere: any = { name: { contains: key } }
      if (key === 'sanAndres') { cityWhere = { id: 21331 } }
      if (key === 'santaMarta') { cityWhere = { id: 21421 } }

      const city = await db.city.findFirst({ where: cityWhere })
      const state = await db.state.findFirst({ where: { id: city?.stateId } })
      const country = await db.country.findFirst({ where: { id: state?.countryId } })
      const users = (await db.user.findMany({
        where: { roles: { some: { name: 'member' } } },
        select: { id: true }
      })).map((u: any) => u.id)

      for (const hotelId of [...hotelsIds.slice(0, 10)]) {
        const hotelRequest = {
          ...baseRequest,
          ...options.summary,
          params: {
            ...options.summary.params,
            hotel_id: hotelId,
          }
        }

        const roomsRequest = {
          ...baseRequest,
          ...options.rooms,
          params: {
            ...options.rooms.params,
            hotel_id: hotelId,
          }
        }

        const reviewsRequest = {
          ...baseRequest,
          ...options.reviews,
          params: {
            ...options.reviews.params,
            hotel_id: hotelId,
          }
        }

        const [
          { data: hotelData },
          { data: roomsData },
          { data: reviewsData },
        ] = await Promise.all([
          axios.request(hotelRequest),
          axios.request(roomsRequest),
          axios.request(reviewsRequest),
        ])

        const hotelProps = mapJsonToHotel(hotelData, {
          cityId: city?.id as number,
          stateId: state?.id as number,
          countryId: country?.id as number,
        })
        let hotel = await db.hotel.findFirst({ where: { name: hotelProps.name } })
        if (!hotel) {
          hotel = await db.hotel.create({ data: hotelProps })
        }

        const roomsProps = mapJsonToRooms(roomsData, hotel.id)
        const rooms = await db.room.findMany({ where: { hotelId: hotel.id } })
        if (!rooms || rooms.length === 0) {
          await db.room.createMany({ data: roomsProps })
        }

        const reviewsProps = mapJsonToReviews(reviewsData, hotel.id, users)
        const reviews = await db.review.findMany({ where: { hotelId: hotel.id } })
        if (!reviews || reviews.length === 0) {
          await db.review.createMany({ data: reviewsProps })
        }
      }
    }
  } catch (error: any) {
    console.error(error)
  } finally {
    db.$disconnect()
  }
}
