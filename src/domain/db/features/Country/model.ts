import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript'

import type { CountryAttributes, CountryCreationAttributes } from './types'
import { State } from '../State'
import { Hotel } from '../Hotel'

@Table({ tableName: 'countries', timestamps: true })
export class Country extends Model<CountryAttributes, CountryCreationAttributes> implements CountryAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number

  @Column(DataType.STRING)
  name!: string

  @Column(DataType.STRING)
  iso3!: string

  @Column(DataType.STRING)
  iso2!: string

  @Column(DataType.STRING)
  numeric_code!: string

  @Column(DataType.INTEGER)
  phone_code!: number

  @Column(DataType.STRING)
  capital!: string

  @Column(DataType.STRING)
  currency!: string

  @Column(DataType.STRING)
  currency_name!: string

  @Column(DataType.STRING)
  currency_symbol!: string

  @Column(DataType.STRING)
  tld!: string

  @Column(DataType.STRING)
  native?: string

  @Column(DataType.STRING)
  region!: string

  @Column(DataType.STRING)
  subregion!: string

  @Column(DataType.STRING)
  latitude!: string

  @Column(DataType.STRING)
  longitude!: string

  @Column(DataType.STRING)
  emoji!: string

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt!: Date

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt?: Date

  @HasMany(() => State)
  states!: State[]

  @HasMany(() => Hotel)
  hotels!: Hotel[]
}
