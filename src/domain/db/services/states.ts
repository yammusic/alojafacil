import type { StateProps } from '../modelsOld/State'
import { State } from '../modelsOld/State'

export const getStates = async (where?: StateProps) => {
  const states = await State.all(where)
  return states
}

export const getState = async (where: StateProps) => {
  const state = await State.findOne(where)
  return state
}
