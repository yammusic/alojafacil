'use client'

import type { CallEffect, PutEffect } from 'redux-saga/effects'
import { call, fork, put, takeLatest } from 'redux-saga/effects'
import type { AnyAction } from 'redux-saga'

import { fetchCountries, fetchStates } from '@/infra/services'
import { delay } from '@/domain/utils'

import {
  appStart,
  getRegionData,
  setCountries,
  setReady,
  setStates,
} from './actions'

type RegionData = Generator<CallEffect | PutEffect, void, any>

function* start() {
  try {
    yield put(setReady(true))
    console.log('App started!')
  } catch (err) {
    console.error(err)
  }
}

function* loadRegionData(action: AnyAction): RegionData {
  try {
    const { countryId, stateId } = action.payload ?? {}
    const countries = (yield call(fetchCountries)).content.data ?? []
    const states = countryId ? (yield call(fetchStates, countryId)).content.data : []
    console.log({ countryId, stateId, states })

    yield put(setCountries(countries))
    yield put(setStates(states))
  } catch (err) {
    console.error(err)
  }
}

function* appWatcher() {
  yield takeLatest(appStart, start)
  yield takeLatest(getRegionData, loadRegionData)
}

export function* appSaga() {
  yield fork(appWatcher)

  yield delay(250)
  yield put(appStart())
}
