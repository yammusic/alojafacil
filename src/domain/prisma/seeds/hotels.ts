import axios from 'axios'
import { useTurso } from '../../db/client'

export async function seedHotels() {
  const db = useTurso()
  const regions = {
    ibague: '602442',
  }

  try {
    const options = {
      method: 'GET',
      url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/search',
      params: {
        region_id: regions.ibague,
        locale: 'en_US',
        checkin_date: '2024-05-20',
        sort_order: 'DISTANCE',
        adults_number: '1',
        domain: 'US',
        checkout_date: '2024-06-01',
        lodging_type: 'HOTEL,HOSTEL,APART_HOTEL',
        // star_rating_ids: '3,4,5',
        // page_number: '1',
        // guest_rating_min: '8'
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
      }
    }

    const { data } = await axios.request(options)
    const hotels = data.properties.filter((h: any) => h.regionId === regions.ibague)

    console.log('Hotels data', { hotels: hotels.length })



    // const count = await db.country.count()

    // if (count === 0) {
    //   for (const country of data) {
    //     await db.country.upsert({
    //       where: { id: country.id },
    //       create: country,
    //       update: country,
    //     })
    //   }
    // }
  } catch (error: any) {
    console.error(error)
  } finally {
    db.$disconnect()
  }
}
