import type { Optional } from 'sequelize'

export interface ReviewAttributes {
  id?: number;
  hotelId: number;
  userId: number;
  rating?: number;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
