import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import '@/domain/polyfills'

import {
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers/http'

import { useDb, useTurso } from '@/domain/db'
import type {
  CityAttributes,
  CountryAttributes,
  HotelAttributes,
  ReviewAttributes,
  RoleAttributes,
  RoomAttributes,
  SessionAttributes,
  StateAttributes,
  UserAttributes,
  UserInfoAttributes,
} from '@/domain/db'

export async function GET(req: NextRequest) {
  const res = NextResponse
  const params = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  )

  const db = useTurso()
  const {
    City,
    Country,
    Hotel,
    Review,
    Role,
    Room,
    Session,
    State,
    User,
    UserInfo,
    UserRole,
  } = await useDb(true)

  try {
    await apiMiddleware(req, params, res, {
      only: ['GET'],
    })

    // Countries seed
    const countriesData = await db.country.findMany() ?? []
    await Country.bulkCreate(countriesData as CountryAttributes[])

    // States seed
    const statesData = await db.state.findMany() ?? []
    await State.bulkCreate(statesData as StateAttributes[])

    // Cities seed
    for (const state of statesData) {
      const citiesData = await db.city.findMany({ where: { stateId: state.id } }) ?? []
      await City.bulkCreate(citiesData as CityAttributes[])
    }

    // Roles seed
    const rolesData = await db.role.findMany() ?? []
    await Role.bulkCreate(rolesData as RoleAttributes[])
    const admin = await Role.findOne({ where: { name: 'admin' } })
    const member = await Role.findOne({ where: { name: 'member' } })

    // Users seed
    const usersData = await db.user.findMany() ?? []
    for (const user of usersData) {
      const [u] = await User.findOrCreate({
        where: { id: user.id },
        defaults: user as UserAttributes,
        include: [Role],
      })

      // User Roles
      if (u.username === 'admin' && !u.roles?.some(r => r.id === admin?.id)) {
        await UserRole.findOrCreate({
          where: { userId: u.id, roleId: admin?.id },
          defaults: { userId: u.id, roleId: admin?.id as number },
        })
      } else if (u.username !== 'admin' && !u.roles?.some(r => r.id === member?.id)) {
        await UserRole.findOrCreate({
          where: { userId: u.id, roleId: member?.id },
          defaults: { userId: u.id, roleId: member?.id as number },
        })
      }
    }

    // UserInfo seed
    const userInfoData = await db.userInfo.findMany() ?? []
    await UserInfo.bulkCreate(userInfoData as UserInfoAttributes[])

    // Sessions seed
    const sessionsData = await db.session.findMany()
    await Session.bulkCreate(sessionsData as SessionAttributes[])

    // Hotels seed
    const hotelsData = await db.hotel.findMany() ?? []
    await Hotel.bulkCreate(hotelsData as HotelAttributes[])
    // for (const hotel of hotelsData) {
    //   await Hotel.findOrCreate({
    //     where: { id: hotel.id },
    //     defaults: hotel as HotelAttributes,
    //   })
    // }

    // Rooms seed
    const roomsData = await db.room.findMany() ?? []
    await Room.bulkCreate(roomsData as RoomAttributes[])
    // for (const room of roomsData) {
    //   await Room.findOrCreate({
    //     where: { id: room.id },
    //     defaults: room as RoomAttributes,
    //   })
    // }

    // Reviews seed
    const reviewsData = await db.review.findMany() ?? []
    await Review.bulkCreate(reviewsData as ReviewAttributes[])
    // for (const review of reviewsData) {
    //   await Review.findOrCreate({
    //     where: { id: review.id },
    //     defaults: review as ReviewAttributes,
    //   })
    // }

    return responseApiSuccess(res, {
      content: {
        message: 'Seeds successfully!',
        // data,
      },
    })
  } catch (exception) {
    console.error(exception)
    return responseApiException(res, exception)
  }
}
