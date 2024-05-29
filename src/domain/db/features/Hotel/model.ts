import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  Default,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript'

import { HotelStatus, type HotelAttributes, type HotelCreationAttributes } from './types'
import { City } from '../City'
import { Room } from '../Room'
import { Country } from '../Country'
import { State } from '../State'
import { Review } from '../Review'

@Table({ tableName: 'hotels', timestamps: true })
export class Hotel extends Model<HotelAttributes, HotelCreationAttributes> implements HotelAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @Column(DataType.STRING)
  name!: string

  @Column(DataType.STRING)
  description?: string

  @Column(DataType.STRING)
  address!: string

  @Column(DataType.STRING)
  latitude!: string

  @Column(DataType.STRING)
  longitude!: string

  @ForeignKey(() => City)
  @Column(DataType.INTEGER)
  cityId!: number

  @ForeignKey(() => State)
  @Column(DataType.INTEGER)
  stateId!: number

  @ForeignKey(() => Country)
  @Column(DataType.INTEGER)
  countryId!: number

  @Column(DataType.STRING)
  postalCode!: string

  @Column(DataType.TEXT)
  picture!: string

  @Column(DataType.TEXT)
  images!: string

  @Default(true)
  @Column(DataType.BOOLEAN)
  available!: boolean

  @Column(DataType.FLOAT)
  rating?: number

  @Column(DataType.TEXT)
  amenities?: string

  @Column(DataType.TEXT)
  policies?: string

  @Column(DataType.TEXT)
  features?: string

  @Column(DataType.TEXT)
  payments?: string

  @Default(HotelStatus.ACTIVE)
  @Column(DataType.STRING)
  status!: HotelStatus

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt!: Date

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt?: Date

  @BelongsTo(() => City)
  city!: ReturnType<() => City>

  @BelongsTo(() => State)
  state!: ReturnType<() => State>

  @BelongsTo(() => Country)
  country!: ReturnType<() => Country>

  @HasMany(() => Room)
  rooms!: Room[]

  @HasMany(() => Review)
  reviews!: Review[]

  async getCity() {
    if (!this.city) {
      this.city = await City.findOne({ where: { id: this.cityId } }) as City
    }
    return this.city
  }

  async getState() {
    if (!this.state) {
      this.state = await State.findOne({ where: { id: this.stateId } }) as State
    }
    return this.state
  }

  async getCountry() {
    if (!this.country) {
      this.country = await Country.findOne({ where: { id: this.countryId } }) as Country
    }
    return this.country
  }

  async getRooms() {
    if (!this.rooms) {
      this.rooms = await Room.findAll({ where: { hotelId: this.id } })
    }
    return this.rooms
  }

  async getReviews() {
    if (!this.reviews) {
      this.reviews = await Review.findAll({ where: { hotelId: this.id } })
    }
    return this.reviews
  }
}
