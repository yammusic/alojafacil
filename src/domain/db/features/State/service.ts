import type { WhereOptions } from 'sequelize'
import type { StateAttributes } from './types'
import { useDb } from '../../client'

type Where = WhereOptions<StateAttributes>

export const getStates = async (where?: Where) => {
  const { State } = await useDb()
  const states = await State.findAll({ where })
  return states
}

export const getState = async (where: Where) => {
  const { State, Country, City } = await useDb()
  const include = [Country, City]
  const state = await State.findOne({ where, include })
  return state
}
