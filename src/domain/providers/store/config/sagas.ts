import { all } from 'redux-saga/effects'
import { appSaga } from '../features'

export function* rootSaga() {
  yield all([
    appSaga(),
  ])
}
