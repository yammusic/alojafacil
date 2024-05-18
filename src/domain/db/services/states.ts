import type { StateProps } from '../models/State'
import { State } from '../models/State'

export const getStates = async (where?: StateProps) => {
  const states = await State.all(where)
  return states
}

export const getState = async (where: StateProps) => {
  const state = await State.findOne(where)
  return state
}
