import type { SequelizeOptions } from 'sequelize-typescript'

const config: SequelizeOptions = {
  dialect: 'sqlite',
  storage: process.env.DATABASE_URL as string,
  // models: ['../../db/features/**/model.ts'],
}

export default config
