import type { SequelizeOptions } from 'sequelize-typescript'
// import * as tedious from 'tedious'
import pg from 'pg'

const config: SequelizeOptions = {
  // dialect: 'sqlite',
  // storage: process.env.DATABASE_URL as string,

  // dialect: 'mssql',
  // port: 1433,
  // dialectModule: tedious,
  // dialectOptions: {
  //   options: {
  //     encrypt: true,
  //     trustServerCertificate: true
  //   },
  // },

  dialect: 'postgres',
  host: String(process.env.DATABASE_HOST),
  port: Number(process.env.DATABASE_PORT ?? 5432),
  database: String(process.env.DATABASE_NAME),
  username: String(process.env.DATABASE_USER),
  password: String(process.env.DATABASE_PASSWORD),
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
}

export default config
