import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import '@/domain/polyfills'

import {
  apiMiddleware,
  responseApiException,
  responseApiSuccess,
} from '@/domain/providers'

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
  } = await useDb()

  try {
    await apiMiddleware(req, params, res, {
      only: ['GET'],
    })

    // Countries seed
    const countriesData = await db.country.findMany() ?? []
    for (const country of countriesData) {
      await Country.findOrCreate({
        where: { id: country.id },
        defaults: country as CountryAttributes,
      })
    }

    // States seed
    const statesData = await db.state.findMany() ?? []
    for (const state of statesData) {
      await State.findOrCreate({
        where: { id: state.id },
        defaults: state as StateAttributes,
      })

      // Cities seed
      const citiesData = await db.city.findMany({ where: { stateId: state.id } }) ?? []
      for (const city of citiesData) {
        await City.findOrCreate({
          where: { id: city.id },
          defaults: city as CityAttributes,
        })
      }
    }

    // Roles seed
    const rolesData = await db.role.findMany() ?? []
    for (const role of rolesData) {
      await Role.findOrCreate({
        where: { id: role.id },
        defaults: role as RoleAttributes,
      })
    }
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
    for (const userInfo of userInfoData) {
      await UserInfo.findOrCreate({
        where: { id: userInfo.id },
        defaults: userInfo as UserInfoAttributes,
      })
    }

    // Sessions seed
    const sessionsData = await db.session.findMany()
    for (const session of sessionsData) {
      await Session.findOrCreate({
        where: { id: session.id },
        defaults: session as SessionAttributes,
      })
    }

    // Hotels seed
    const hotelsData = await db.hotel.findMany() ?? []
    for (const hotel of hotelsData) {
      await Hotel.findOrCreate({
        where: { id: hotel.id },
        defaults: hotel as HotelAttributes,
      })
    }

    // Rooms seed
    const roomsData = await db.room.findMany() ?? []
    for (const room of roomsData) {
      await Room.findOrCreate({
        where: { id: room.id },
        defaults: room as RoomAttributes,
      })
    }

    // Reviews seed
    const reviewsData = await db.review.findMany() ?? []
    for (const review of reviewsData) {
      await Review.findOrCreate({
        where: { id: review.id },
        defaults: review as ReviewAttributes,
      })
    }

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
