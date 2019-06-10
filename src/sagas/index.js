import { all, fork } from 'redux-saga/effects'
import getSagas from './getSagas'

export default function* rootSaga() {
  yield all([fork(getSagas)])
}
