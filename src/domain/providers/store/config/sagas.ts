'use client'

import { all } from 'redux-saga/effects'
import { appSaga, themeSaga } from '../features'

export function* rootSaga() {
  yield all([
    appSaga(),
    themeSaga(),
  ])
}
