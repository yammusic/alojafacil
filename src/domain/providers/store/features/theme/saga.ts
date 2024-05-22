'use client'

import { fork } from 'redux-saga/effects'
// import type { AnyAction } from 'redux-saga'

// import { setDrawerWidth } from './actions'

// function* useDrawerWidth({ payload }: AnyAction) {
//   try {
//     yield put(setDrawerWidth(payload ? 260 : 72))
//   } catch (err) {
//     console.error(err)
//   }
// }

function* themeWatcher() {
  // yield takeLatest(setDrawerOpen, useDrawerWidth)
}

export function* themeSaga() {
  yield fork(themeWatcher)
}
