import 'reflect-metadata'
import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

import { Sequelize } from 'sequelize-typescript'
import config from './config/sequelize'

import {
  User,
  UserInfo,
  Role,
  UserRole,
  Session,
  Booking,
  City,
  Country,
  Hotel,
  Review,
  Room,
  State,
} from './features'

let sequelize: Sequelize
// let orm: MikroORM

export const useTurso = () => {
  const libsql = createClient({
    url: process.env.TURSO_DATABASE_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })


  const adapter = new PrismaLibSQL(libsql)
  return new PrismaClient({ adapter })
}

export const useSequelize = () => {
  if (!sequelize) {
    sequelize = new Sequelize(config)
  }
  return sequelize
}

export const useDb = async (sync: boolean = false) => {
  if (!sequelize) { useSequelize() }

  sequelize.addModels([
    Booking,
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
  ])

  if (sync) {
    await sequelize.sync()
  }

  return {
    Booking,
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
  }
}
